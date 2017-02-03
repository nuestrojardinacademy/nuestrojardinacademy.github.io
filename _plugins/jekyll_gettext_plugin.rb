#require "jekyll/gettext/plugin/version"

require 'fast_gettext'
require 'get_pomo'

require 'pry'

class TranslationLogger
  def initialize
    @translations = []
  end
  
  def get_translations
    return @translations
  end
  
  def call(unfound)
    @translations.push(unfound)
  end
end

module Jekyll

  class Site
    
    alias :process_org :process
    def process
      if !self.config['baseurl']
        self.config['baseurl'] = ""
      end
      
      # variables
      config['baseurl_root'] = self.config['baseurl']
      baseurl_org = self.config['baseurl']
      languages = self.config['languages']
      dest_org = self.dest

      # loop
      self.config['lang'] = languages.first
      puts
      puts "Building site for default language: \"#{self.config['lang']}\" to: " + self.dest
      self.load_translations
      process_org
      self.save_missing_translations
      
      languages.drop(1).each do |lang|

        # build site for language lang
        puts self.dest + "/" + lang
        #self.dest = self.dest + "/" + lang
        self.config['baseurl'] = baseurl_org + "/" + lang
        self.config['lang'] = lang
        puts "Building site for language: \"#{self.config['lang']}\" to: " + self.dest + "/" + lang
        self.load_translations
        process_org
        self.save_missing_translations

        # reset variables for next language
        #self.dest = dest_org
        #self.config['baseurl'] = baseurl_org
      end
      puts 'Build complete'
    end

    def load_translations
      @all_translations = TranslationLogger.new
      @missing_translations = TranslationLogger.new

      repos = [
        FastGettext::TranslationRepository.build(self.config['lang'], :type=>:logger, :callback=>@all_translations),
        FastGettext::TranslationRepository.build(self.config['lang'], :type=>:logger, :callback=>@missing_translations),
        FastGettext::TranslationRepository.build(self.config['lang'], :path => self.source + "/_i18n", :type => :po)
      ]
      FastGettext.add_text_domain(self.config['lang'], :type=>:chain, :chain=>repos)

      FastGettext.text_domain = self.config['lang']
      FastGettext.locale = self.config['lang']
    end

    # def load_translations_en
    #   @all_translations = TranslationLogger.new
    #   @missing_translations = TranslationLogger.new

    #   repos = [
    #     FastGettext::TranslationRepository.build('en', :type=>:logger, :callback=>@all_translations),
    #     FastGettext::TranslationRepository.build('en', :type=>:logger, :callback=>@missing_translations),
    #     FastGettext::TranslationRepository.build('en', :path => self.source + "/_i18n", :type => :po)
    #   ]
    #   FastGettext.add_text_domain('en', :type=>:chain, :chain=>repos)

    #   FastGettext.text_domain = 'en'
    #   FastGettext.locale = 'en'
    # end

    def save_missing_translations
      filename = self.source + "/_i18n/" + self.config['lang'] + '/' + self.config['lang'] + '.po'
      existing_translations = GetPomo.unique_translations(GetPomo::PoFile.parse(File.read(filename)))
      
      # ignores any keys that already exist
      missing_translations_msgids = @missing_translations.get_translations.reject {|msgid| existing_translations.find {|trans| trans.msgid == msgid}}
      
      final_translations = existing_translations
      
      missing_translations_msgids.each do |new_msgid|
        new_trans = GetPomo::Translation.new
        new_trans.msgid = new_msgid
        new_trans.msgstr = ""
        final_translations.push(new_trans)
      end
      
      # uncomment this to remove translations that were not used
      # not_used = final_translations.reject { |trans| @all_translations.get_translations.find {|msgid| trans.msgid == msgid}}
      # final_translations = final_translations.reject {|trans1| not_used.find {|trans2| trans1.msgid == trans2.msgid}}
      
      final_translations.sort_by!(&:msgid)
      
      File.open(filename, 'w'){|f|f.print(GetPomo::PoFile.to_text(final_translations))}
    end
  end

  class LocalizeTag < Liquid::Tag
    include FastGettext::Translation

    def initialize(tag_name, key, tokens)
      super
      @key = key.strip # remove whitespace
      @key = @key[1..-2] # remove leading and trailing quotes
    end

    def render(context)
      # puts 'here'
      # puts context.registers[:page]["path"].start_with?("es/") 
      if context.registers[:page]["path"].start_with?("es/") 
        FastGettext.locale = 'es'
      else
        FastGettext.locale = 'en'
      end

      #puts @key
        
      candidate = _(@key)

      if candidate == ""
        candidate = @key
      end
      candidate
    end
  end


  # class LocalizeTag < Liquid::Tag

  #   def initialize(tag_name, key, tokens)
  #     super
  #     @key = key.strip
  #   end

  #   def render(context)
  #     if "#{context[@key]}" != "" #Check for page variable
  #       key = "#{context[@key]}"
  #     else
  #       key = @key
  #     end
  #     lang = context.registers[:site].config['lang']
  #     unless Jekyll.langs.has_key?(lang)
  #       puts "Loading translation from file #{context.registers[:site].source}/_i18n/#{lang}.yml"
  #       Jekyll.langs[lang] = YAML.load_file("#{context.registers[:site].source}/_i18n/#{lang}.yml")
  #     end
  #     translation = Jekyll.langs[lang].access(key) if key.is_a?(String)
  #     if translation.nil? or translation.empty?
  #       translation = Jekyll.langs[context.registers[:site].config['default_lang']].access(key)
  #       puts "Missing i18n key: #{lang}:#{key}"
  #       puts "Using translation '%s' from default language: %s" %[translation, context.registers[:site].config['default_lang']]
  #     end
  #     translation
  #   end
  # end

end

Liquid::Template.register_tag('trans', Jekyll::LocalizeTag)
Liquid::Template.register_tag('translate', Jekyll::LocalizeTag)