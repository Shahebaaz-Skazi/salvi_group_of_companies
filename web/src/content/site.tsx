import React from "react";

export const siteContent = {
  groupName: "Salvi Group of Companies",
  tagline: "Bridging Skills and Success",
  contact: {
    whatsapp: "+917498245215",
    phone: "+91 9118113111",
    email: "primeworkforcesolutionsllp@gmail.com",
    address: "Office No. 8, B Wing, 1st Floor, The Jewel of Pimpri, Pimpri, Pune 411018",
  },
  socials: {
    linkedin: "#TODO_CONFIRM",
    facebook: "#TODO_CONFIRM",
  },
  compliance: {
    llpName: "Primeworkforce Solutions LLP",
    gst: "27ABJFP7711M1ZP",
    udyam: "UDYAM-MH-26-1212463",
    pan: "ABJFP7711M",
    // TODO_CONFIRM: verify with client if PF/ESIC numbers should be displayed publicly
    // pfNo: "PUAKD4083007000",
    // esic: "33001776320000999"
  }
};

const translations: Record<string, string> = {
  // Nav
  "Our Companies": "आमच्या कंपन्या",
  "About": "आमच्याबद्दल",
  "Clients": "ग्राहक",
  "Gallery": "गॅलरी",
  "Careers": "करिअर",
  "Contact": "संपर्क",
  "Get a Quote": "कोटेशन मिळवा",
  "Home": "मुख्यपृष्ठ",
  // Hero text
  "Bridging Skills and Success": "कौशल्य आणि यशाची सांगड",
  // Careers & Resume
  "Upload Resume / CV": "बायोडेटा / रेझ्युमे अपलोड करा",
  "Resume / CV": "रेझ्युमे / सीव्ही",
  "Submit your profile": "तुमचे प्रोफाइल सबमिट करा",
  "Submit Application": "अर्ज सबमिट करा",
  // TODO_CONFIRM: remaining strings for human translator
};

/** 
 * Ponytail i18n: Returns a span containing both languages. 
 * The Marathi text is hidden by default and shown via CSS when .lang-mr is on <html>.
 * This keeps the site 100% static, avoids React hydration mismatches, and requires no cookies.
 */
export const t = (text: string): React.ReactNode => {
  const mr = translations[text];
  if (!mr) return text;
  return (
    <>
      <span className="en-text">{text}</span>
      <span className="mr-text hidden">{mr}</span>
    </>
  );
};
