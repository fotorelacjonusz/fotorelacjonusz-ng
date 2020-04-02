import * as i18n from "../../app/util/i18n.js"

describe(".availableLanguages", function() {
  it("is an object describing available languages", function() {
    let val = i18n.availableLanguages
    expect(val).toBeNonEmptyObject()
    expect(val).toHaveNonEmptyString("en")
    expect(Object.values(val)).toBeArrayOfStrings()
  })
})

describe(".defaultLanguage", function() {
  it("is one of the string in availableLanguages keys", function() {
    let val = i18n.defaultLanguage
    expect(val).toBeNonEmptyString()
    expect(i18n.availableLanguages).toHaveMember(val)
  })
})

describe(".translations", function() {
  it("is an object of objects with translations", function() {
    let val = i18n.translations
    expect(val).toBeNonEmptyObject()
    expect(Object.values(val)).toBeArrayOfObjects()
  })
})

describe(".gettextPluginConfig", function() {
  it("is an object", function() {
    let val = i18n.gettextPluginConfig
    expect(val).toBeObject()
  })
})
