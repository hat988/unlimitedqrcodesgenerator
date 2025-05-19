// --- Start JavaScript ---
    document.addEventListener('DOMContentLoaded', () => {
        console.log("LOG: Page loaded and initial script running.");

        // --- DOM Element selections ---
        const contentTypeSelect = document.getElementById('contentType');
        const contentFieldsContainer = document.getElementById('contentFields');
        const generateQrButton = document.getElementById('generateQrButton');
        const qrCodeContainer = document.getElementById('qrCodeContainer');
        const qrCanvasWithFrame = document.getElementById('qrCanvasWithFrame');
        const qrDataPreview = document.getElementById('qrDataPreview');

        const colorDarkInput = document.getElementById('colorDark');
        const colorLightInput = document.getElementById('colorLight');
        const gradientTypeSelect = document.getElementById('gradientType');
        const gradientColor1Input = document.getElementById('gradientColor1');
        const gradientColor2Input = document.getElementById('gradientColor2');
        const gradientRotationInput = document.getElementById('gradientRotation');
        const eyeColorOuterInput = document.getElementById('eyeColorOuter');
        const eyeColorInnerInput = document.getElementById('eyeColorInner');

        const logoFileInput = document.getElementById('logoFile');
        const logoSizeInput = document.getElementById('logoSize');
        const logoMarginInput = document.getElementById('logoMargin');
        const logoRemoveBackgroundCheckbox = document.getElementById('logoRemoveBackground');
        const removeLogoBtn = document.getElementById('removeLogoBtn');

        const dotsStyleSelect = document.getElementById('dotsStyle');
        const cornersSquareStyleSelect = document.getElementById('cornersSquareStyle');
        const cornersDotStyleSelect = document.getElementById('cornersDotStyle');
        
        const qrSizeInput = document.getElementById('qrSize');
        const qrMarginInput = document.getElementById('qrMargin');
        const errorCorrectionLevelSelect = document.getElementById('errorCorrectionLevel');

        const enableFrameCheckbox = document.getElementById('enableFrame');
        const frameOptionsDiv = document.getElementById('frameOptions');
        const frameColorInput = document.getElementById('frameColor');
        const frameSizeInput = document.getElementById('frameSize');
        const frameTextInput = document.getElementById('frameText');
        const frameTextColorInput = document.getElementById('frameTextColor');
        const frameFontInput = document.getElementById('frameFont');

        const languageSelector = document.getElementById('languageSelector');
        const designTemplatesContainer = document.querySelector('#designTemplatesSection .templates-grid');
        const transparentPngCheckbox = document.getElementById('transparentPng');
        const transparentPngNote = document.getElementById('transparentPngNote');

        const downloadPNGButton = document.getElementById('downloadPNG');
        const downloadJPGButton = document.getElementById('downloadJPG');
        const downloadSVGButton = document.getElementById('downloadSVG');
        const downloadPDFButton = document.getElementById('downloadPDF');
        
        let qrCodeInstance = null;
        let currentLogo = null;
        const { jsPDF } = window.jspdf;

        // --- I18N (Internationalization) ---
        const translations = {
            en: {
                siteTitle: "Unlimited QR Code Generator",
                navHome: "Home", navFeatures: "Features", navFAQ: "FAQ", navContact: "Contact",
                languageSelectorLabel: "Select Language:",
                contentTypeTitle: "1. Content Type",
                customizationTitle: "2. Customization",
                designTemplatesTitle: "Design Templates",
                tabColors: "Colors", tabLogo: "Logo", tabShapes: "Shapes", tabFrame: "Frame", tabMisc: "Misc",
                colorDarkLabel: "Foreground Color:", colorLightLabel: "Background Color:",
                gradientForegroundTitle: "Gradient Foreground (Optional)",
                gradientTypeLabel: "Type:", gradientNone: "None", gradientLinear: "Linear", gradientRadial: "Radial",
                gradientColor1Label: "Color 1:", gradientColor2Label: "Color 2:", gradientRotationLabel: "Rotation (Linear):",
                eyeColorsTitle: "Eye Colors (Optional)",
                eyeColorOuterLabel: "Outer Eye Color:", eyeColorOuterSmall: "Leave blank to use foreground/gradient",
                eyeColorInnerLabel: "Inner Eye Color:", eyeColorInnerSmall: "Leave blank to use foreground/gradient",
                logoFileLabel: "Upload Logo:", logoSizeLabel: "Logo Size (0-1):", logoMarginLabel: "Logo Margin:",
                logoRemoveBackgroundLabel: "Hide QR Dots Behind Logo", removeLogoBtn: "Remove Logo",
                dotsStyleLabel: "Dots Style:", cornersSquareStyleLabel: "Corner Square Style:", cornersDotStyleLabel: "Corner Dot Style:",
                shapeSquare: "Square", shapeDots: "Dots", shapeRounded: "Rounded", shapeClassy: "Classy",
                shapeClassyRounded: "Classy Rounded", shapeExtraRounded: "Extra Rounded", shapeDefault: "Default", shapeDot: "Dot",
                frameExperimentalNote: "Note: This is a basic frame. For advanced frames, further customization would be needed.",
                enableFrameLabel: "Enable Frame", frameColorLabel: "Frame Color:", frameSizeLabel: "Frame Padding (px):",
                frameTextLabel: "Frame Text:", frameTextColorLabel: "Text Color:", frameFontLabel: "Font:",
                qrSizeLabel: "QR Code Size (px):", qrMarginLabel: "QR Margin (px):",
                errorCorrectionLevelLabel: "Error Correction:", ecLow: "Low (L)", ecMedium: "Medium (M)", ecQuartile: "Quartile (Q)", ecHigh: "High (H)",
                generateQrButton: "Generate / Update QR Code",
                previewTitle: "3. Preview", downloadTitle: "4. Download",
                qrDataPreviewPlaceholder: "QR Data will appear here...",
                transparentPngLabel: "PNG with Transparent Background",
                transparentPngNote: "(Not applicable if frame is enabled)",
                downloadPNG: "Download PNG", downloadJPG: "Download JPG", downloadSVG: "Download SVG", downloadPDF: "Download PDF",
                importantNote: "<strong>Important:</strong> All QR codes are generated directly in your browser. They are static, do not expire, and do not redirect to this website. The data you enter is not sent to any server.",
                footerCopyright: "Unlimited QR Code Generator. All Rights Reserved.",
                footerPrivacy: "Privacy Policy", footerTerms: "Terms of Service",
                typeUrl: "URL", typeText: "Text", typeEmail: "Email", typePhone: "Phone (Call)", typeSms: "SMS",
                typeWhatsapp: "WhatsApp", typeVcard: "VCard", typeMecard: "MeCard", typeWifi: "WiFi",
                typeLocation: "Location (Lat/Lng)", typeEvent: "Event (VCALENDAR)", typePaypal: "PayPal",
                typeBitcoin: "Bitcoin", typeFacebook: "Facebook", typeTwitter: "Twitter/X", typeInstagram: "Instagram",
                typeLinkedin: "LinkedIn", typeYoutube: "YouTube",
                urlLabel: "URL:", urlPlaceholder: "https://example.com",
                textLabel: "Text:", textPlaceholder: "Enter your text",
                emailAddressLabel: "Email Address:", emailAddressPlaceholder: "name@example.com",
                emailSubjectLabel: "Subject (Optional):", emailSubjectPlaceholder: "Email Subject",
                emailBodyLabel: "Body (Optional):", emailBodyPlaceholder: "Email Body",
                phoneLabel: "Phone Number:", phonePlaceholder: "+1234567890",
                smsPhoneLabel: "Phone Number:", smsPhonePlaceholder: "+1234567890",
                smsMessageLabel: "Message (Optional):", smsMessagePlaceholder: "SMS Message",
                whatsappPhoneLabel: "Phone Number (with country code):", whatsappPhonePlaceholder: "1234567890 (no + or 00)",
                whatsappMessageLabel: "Message (Optional):", whatsappMessagePlaceholder: "WhatsApp Message",
                vcardFirstNameLabel: "First Name:", vcardLastNameLabel: "Last Name:", vcardOrgLabel: "Organization:",
                vcardTitleLabel: "Title:", vcardTelWorkLabel: "Phone (Work):", vcardTelMobileLabel: "Phone (Mobile):",
                vcardEmailLabel: "Email:", vcardWebsiteLabel: "Website:", vcardStreetLabel: "Street:",
                vcardCityLabel: "City:", vcardStateLabel: "State/Region:", vcardZipLabel: "ZIP/Postal Code:",
                vcardCountryLabel: "Country:", vcardNoteLabel: "Note:",
                mecardNameLabel: "Name (Last,First):", mecardNamePlaceholder: "Doe,John",
                mecardPhoneLabel: "Phone:", mecardEmailLabel: "Email:",
                mecardAddressLabel: "Address (Street,City,Zip,Country):", mecardAddressPlaceholder: "123 Main St,Anytown,12345,USA",
                mecardNicknameLabel: "Nickname:", mecardBirthdayLabel: "Birthday (YYYYMMDD):", mecardBirthdayPlaceholder: "19900101",
                mecardUrlLabel: "Website:", mecardUrlPlaceholder: "https://example.com",
                mecardNoteLabel: "Note:",
                wifiSsidLabel: "Network Name (SSID):", wifiPasswordLabel: "Password:",
                wifiEncryptionLabel: "Encryption:", wifiEncryptionWPA: "WPA", wifiEncryptionWEP: "WEP", wifiEncryptionNopass: "No Password",
                wifiHiddenLabel: "Hidden SSID:",
                locLatitudeLabel: "Latitude:", locLatitudePlaceholder: "e.g., 40.7128",
                locLongitudeLabel: "Longitude:", locLongitudePlaceholder: "e.g., -74.0060",
                eventSummaryLabel: "Event Summary/Title:",
                eventStartDateLabel: "Start Date & Time:", eventEndDateLabel: "End Date & Time:",
                eventLocationLabel: "Location (Optional):", eventLocationPlaceholder: "Conference Hall",
                eventDescriptionLabel: "Description (Optional):",
                paypalUserLabel: "PayPal.Me Username or Email:", paypalUserPlaceholder: "yourusername or email@example.com",
                paypalAmountLabel: "Amount (Optional):", paypalAmountPlaceholder: "10.00",
                paypalCurrencyLabel: "Currency Code (Optional):", paypalCurrencyPlaceholder: "USD",
                paypalItemNameLabel: "Item Name (Optional):", paypalItemNamePlaceholder: "Product Name",
                bitcoinAddressLabel: "Bitcoin Address:",
                bitcoinAmountLabel: "Amount (Optional):", bitcoinAmountPlaceholder: "0.01",
                bitcoinLabelLabel: "Label (Optional):", bitcoinLabelPlaceholder: "Payment for X",
                bitcoinMessageLabel: "Message (Optional):", bitcoinMessagePlaceholder: "Thanks for your order",
                socialProfileLabel: "Profile URL or Username/ID:",
                youtubeUrlLabel: "YouTube URL (Video, Channel, User):",
                templateDefault: "Default", templateDarkElegant: "Dark Elegant", templateOceanBlue: "Ocean Blue", templateSunsetGradient: "Sunset Gradient", templateGreenLeaf: "Green Leaf",
                alertGenerateFirst: "Please generate a QR code first.",
                alertSVGFrameNotSupported: "SVG download is not available for QR codes with the frame. Please uncheck 'Enable Frame' to download as SVG, or download as PNG/JPG/PDF.",
                errorGeneric: "Error",
                errorGetData: "Could not generate QR: ",
                errorRequiredField: "is empty.",
                errorWhatsAppPhone: "WhatsApp phone number is required.",
                errorInvalidContent: "Invalid content type selected."
            },
            es: { // Spanish translations (abbreviated for brevity, ensure full translation in actual use)
                siteTitle: "Generador de Códigos QR Ilimitado", navHome: "Inicio", contentTypeTitle: "1. Tipo de Contenido", urlLabel: "URL:", urlPlaceholder: "https://ejemplo.com",
                // ... many more Spanish translations ...
                footerCopyright: "Generador de Códigos QR Ilimitado. Todos los Derechos Reservados."
            },
            hi: { // Hindi translations (abbreviated for brevity)
                siteTitle: "असीमित क्यूआर कोड जेनरेटर", navHome: "होम", contentTypeTitle: "१. सामग्री प्रकार", urlLabel: "यूआरएल:", urlPlaceholder: "https://example.com",
                // ... many more Hindi translations ...
                footerCopyright: "असीमित क्यूआर कोड जेनरेटर। सर्वाधिकार सुरक्षित।"
            }
        };
        let currentLanguage = 'en';

        function _t(key, lang = currentLanguage) {
            return translations[lang]?.[key] || translations.en[key] || key;
        }

        function setLanguage(lang) {
            currentLanguage = lang;
            localStorage.setItem('preferredLanguage', lang);
            document.documentElement.lang = lang;
            const elements = document.querySelectorAll('[data-i18n-key]');
            elements.forEach(el => {
                const key = el.getAttribute('data-i18n-key');
                const translation = _t(key); // _t now handles fallback internally
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.type === 'submit' || el.type === 'button') {
                        el.value = translation;
                    } else {
                        el.placeholder = translation;
                    }
                } else if (el.tagName === 'IMG') {
                    el.alt = translation;
                } else if (el.tagName === 'OPTGROUP') {
                    el.label = translation;
                } else {
                    el.innerHTML = translation;
                }
            });
            generateContentFields(contentTypeSelect.value); // Regenerate fields with new language
            loadDesignTemplates(); // Update template names
            // Update static text not covered by data-i18n-key if any (though most should be covered)
            // Example: qrDataPreview.textContent = _t('qrDataPreviewPlaceholder');
        }

        const contentFieldDefinitions = {
            url: [{ labelKey: 'urlLabel', type: 'url', id: 'url', placeholderKey: 'urlPlaceholder', required: true }],
            text: [{ labelKey: 'textLabel', type: 'textarea', id: 'text', placeholderKey: 'textPlaceholder', required: true }],
            email: [
                { labelKey: 'emailAddressLabel', type: 'email', id: 'emailAddress', placeholderKey: 'emailAddressPlaceholder', required: true },
                { labelKey: 'emailSubjectLabel', type: 'text', id: 'emailSubject', placeholderKey: 'emailSubjectPlaceholder' },
                { labelKey: 'emailBodyLabel', type: 'textarea', id: 'emailBody', placeholderKey: 'emailBodyPlaceholder' }
            ],
            phone: [{ labelKey: 'phoneLabel', type: 'tel', id: 'phone_number', placeholderKey: 'phonePlaceholder', required: true }],
            sms: [
                { labelKey: 'smsPhoneLabel', type: 'tel', id: 'smsPhone', placeholderKey: 'smsPhonePlaceholder', required: true },
                { labelKey: 'smsMessageLabel', type: 'textarea', id: 'smsMessage', placeholderKey: 'smsMessagePlaceholder' }
            ],
            whatsapp: [
                { labelKey: 'whatsappPhoneLabel', type: 'tel', id: 'whatsappPhone', placeholderKey: 'whatsappPhonePlaceholder', required: true },
                { labelKey: 'whatsappMessageLabel', type: 'textarea', id: 'whatsappMessage', placeholderKey: 'whatsappMessagePlaceholder' }
            ],
            vcard: [
                { labelKey: 'vcardFirstNameLabel', type: 'text', id: 'vcardFirstName', required: true }, { labelKey: 'vcardLastNameLabel', type: 'text', id: 'vcardLastName', required: true },
                { labelKey: 'vcardOrgLabel', type: 'text', id: 'vcardOrg' }, { labelKey: 'vcardTitleLabel', type: 'text', id: 'vcardTitle' },
                { labelKey: 'vcardTelWorkLabel', type: 'tel', id: 'vcardTelWork' }, { labelKey: 'vcardTelMobileLabel', type: 'tel', id: 'vcardTelMobile' },
                { labelKey: 'vcardEmailLabel', type: 'email', id: 'vcardEmail' }, { labelKey: 'vcardWebsiteLabel', type: 'url', id: 'vcardWebsite' },
                { labelKey: 'vcardStreetLabel', type: 'text', id: 'vcardStreet' }, { labelKey: 'vcardCityLabel', type: 'text', id: 'vcardCity' },
                { labelKey: 'vcardStateLabel', type: 'text', id: 'vcardState' }, { labelKey: 'vcardZipLabel', type: 'text', id: 'vcardZip' },
                { labelKey: 'vcardCountryLabel', type: 'text', id: 'vcardCountry' }, { labelKey: 'vcardNoteLabel', type: 'textarea', id: 'vcardNote' }
            ],
            mecard: [
                { labelKey: 'mecardNameLabel', type: 'text', id: 'mecardName', placeholderKey: 'mecardNamePlaceholder', required: true },
                { labelKey: 'mecardPhoneLabel', type: 'tel', id: 'mecardPhone' }, { labelKey: 'mecardEmailLabel', type: 'email', id: 'mecardEmail' },
                { labelKey: 'mecardAddressLabel', type: 'text', id: 'mecardAddress', placeholderKey: 'mecardAddressPlaceholder' },
                { labelKey: 'mecardNicknameLabel', type: 'text', id: 'mecardNickname' }, { labelKey: 'mecardBirthdayLabel', type: 'text', id: 'mecardBirthday', placeholderKey: 'mecardBirthdayPlaceholder' },
                { labelKey: 'mecardUrlLabel', type: 'url', id: 'mecardUrl', placeholderKey: 'mecardUrlPlaceholder' }, { labelKey: 'mecardNoteLabel', type: 'text', id: 'mecardNote' }
            ],
            wifi: [
                { labelKey: 'wifiSsidLabel', type: 'text', id: 'wifiSsid', required: true }, { labelKey: 'wifiPasswordLabel', type: 'text', id: 'wifiPassword' },
                { labelKey: 'wifiEncryptionLabel', type: 'select', id: 'wifiEncryption', options: {'WPA': 'wifiEncryptionWPA', 'WEP': 'wifiEncryptionWEP', 'nopass': 'wifiEncryptionNopass'}, required: true },
                { labelKey: 'wifiHiddenLabel', type: 'checkbox', id: 'wifiHidden' }
            ],
            location: [
                { labelKey: 'locLatitudeLabel', type: 'number', id: 'locLatitude', step: 'any', placeholderKey: 'locLatitudePlaceholder', required: true },
                { labelKey: 'locLongitudeLabel', type: 'number', id: 'locLongitude', step: 'any', placeholderKey: 'locLongitudePlaceholder', required: true }
            ],
            event: [
                { labelKey: 'eventSummaryLabel', type: 'text', id: 'eventSummary', required: true },
                { labelKey: 'eventStartDateLabel', type: 'datetime-local', id: 'eventStartDate', required: true }, { labelKey: 'eventEndDateLabel', type: 'datetime-local', id: 'eventEndDate', required: true },
                { labelKey: 'eventLocationLabel', type: 'text', id: 'eventLocation', placeholderKey: 'eventLocationPlaceholder' }, { labelKey: 'eventDescriptionLabel', type: 'textarea', id: 'eventDescription' }
            ],
            paypal: [
                { labelKey: 'paypalUserLabel', type: 'text', id: 'paypalUser', placeholderKey: 'paypalUserPlaceholder', required: true },
                { labelKey: 'paypalAmountLabel', type: 'number', id: 'paypalAmount', step: '0.01', placeholderKey: 'paypalAmountPlaceholder' },
                { labelKey: 'paypalCurrencyLabel', type: 'text', id: 'paypalCurrency', placeholderKey: 'paypalCurrencyPlaceholder' }, { labelKey: 'paypalItemNameLabel', type: 'text', id: 'paypalItemName', placeholderKey: 'paypalItemNamePlaceholder' }
            ],
            bitcoin: [
                { labelKey: 'bitcoinAddressLabel', type: 'text', id: 'bitcoinAddress', required: true },
                { labelKey: 'bitcoinAmountLabel', type: 'number', id: 'bitcoinAmount', step: 'any', placeholderKey: 'bitcoinAmountPlaceholder' },
                { labelKey: 'bitcoinLabelLabel', type: 'text', id: 'bitcoinLabel', placeholderKey: 'bitcoinLabelPlaceholder' }, { labelKey: 'bitcoinMessageLabel', type: 'text', id: 'bitcoinMessage', placeholderKey: 'bitcoinMessagePlaceholder' }
            ],
            facebook: [{ labelKey: 'socialProfileLabel', type: 'text', id: 'socialProfile', placeholder: 'your.profile or page.name', required: true }],
            twitter: [{ labelKey: 'socialProfileLabel', type: 'text', id: 'socialProfile', placeholder: 'username', required: true }],
            instagram: [{ labelKey: 'socialProfileLabel', type: 'text', id: 'socialProfile', placeholder: 'username', required: true }],
            linkedin: [{ labelKey: 'socialProfileLabel', type: 'text', id: 'socialProfile', placeholder: 'in/profileid or company/name', required: true }],
            youtube: [{ labelKey: 'youtubeUrlLabel', type: 'text', id: 'socialProfile', placeholder: 'channel/ID, user/name, or video URL', required: true }]
        };

        function generateContentFields(type) {
            contentFieldsContainer.innerHTML = '';
            const fields = contentFieldDefinitions[type];
            if (!fields) {
                console.error("LOG: No field definitions found for type:", type);
                return;
            }
            console.log(`LOG: Generating fields for type: ${type}`);

            const grid = document.createElement('div');
            grid.className = 'form-grid';
            let firstTextInput = null; // To focus later

            fields.forEach(field => {
                const fieldGroup = document.createElement('div');
                const label = document.createElement('label');
                label.setAttribute('for', field.id);
                label.textContent = _t(field.labelKey);
                fieldGroup.appendChild(label);

                let inputElement;
                if (field.type === 'textarea') {
                    inputElement = document.createElement('textarea');
                } else if (field.type === 'select') {
                    inputElement = document.createElement('select');
                    if (field.options && typeof field.options === 'object') {
                        for (const optValue in field.options) {
                            const option = document.createElement('option');
                            option.value = optValue;
                            option.textContent = _t(field.options[optValue]);
                            inputElement.appendChild(option);
                        }
                    }
                } else if (field.type === 'checkbox') {
                    inputElement = document.createElement('input');
                    inputElement.type = 'checkbox';
                    inputElement.className = 'input-control-inline';
                    const inlineLabel = document.createElement('label');
                    inlineLabel.setAttribute('for', field.id);
                    inlineLabel.textContent = _t(field.labelKey);
                    inlineLabel.style.fontWeight = 'normal';
                    inlineLabel.style.display = 'inline';
                    inlineLabel.style.marginLeft = '5px';
                    fieldGroup.innerHTML = '';
                    fieldGroup.appendChild(inputElement);
                    fieldGroup.appendChild(inlineLabel);
                } else {
                    inputElement = document.createElement('input');
                    inputElement.type = field.type;
                    if (field.step) inputElement.step = field.step;
                }
                
                inputElement.id = field.id;
                if (field.type !== 'checkbox') {
                    inputElement.className = 'input-control';
                }

                // --- Explicitly ensure inputs are not disabled or readonly ---
                inputElement.disabled = false;
                inputElement.readOnly = false;
                // console.log(`LOG: Input ${field.id} disabled: ${inputElement.disabled}, readOnly: ${inputElement.readOnly}`);


                if (inputElement.placeholder !== undefined) { // Check if element supports placeholder
                    if (field.placeholderKey) {
                        inputElement.placeholder = _t(field.placeholderKey);
                    } else if (field.placeholder) {
                        inputElement.placeholder = field.placeholder;
                    }
                }
                if (field.required) inputElement.required = true;
                
                if (field.type !== 'checkbox') {
                    fieldGroup.appendChild(inputElement);
                }
                grid.appendChild(fieldGroup);

                if (!firstTextInput && (field.type === 'text' || field.type === 'url' || field.type === 'email' || field.type === 'tel')) {
                    firstTextInput = inputElement;
                }
            });
            contentFieldsContainer.appendChild(grid);
            if (firstTextInput && firstTextInput.focus) {
                console.log("LOG: Attempting to focus first text input:", firstTextInput.id);
                // setTimeout(() => { firstTextInput.focus(); }, 0); // Slight delay for focus
            }
            console.log("LOG: Finished generating fields.");
        }


        function getQrData() {
            const type = contentTypeSelect.value;
            let data = '';
            function getValue(id) {
                const el = document.getElementById(id);
                if (!el) return '';
                return el.type === 'checkbox' ? el.checked : el.value.trim();
            }
            try {
                switch (type) {
                    case 'url': data = getValue('url'); if (data && !data.match(/^[a-zA-Z]+:\/\//)) data = 'http://' + data; break;
                    case 'text': data = getValue('text'); break;
                    case 'email': data = `mailto:${getValue('emailAddress')}?subject=${encodeURIComponent(getValue('emailSubject'))}&body=${encodeURIComponent(getValue('emailBody'))}`; break;
                    case 'phone': data = `tel:${getValue('phone_number').replace(/[^0-9+]/g, '')}`; break;
                    case 'sms': data = `SMSTO:${getValue('smsPhone')}:${encodeURIComponent(getValue('smsMessage'))}`; break;
                    case 'whatsapp': const wp = getValue('whatsappPhone').replace(/[^0-9]/g, ''); if (wp) data = `https://wa.me/${wp}?text=${encodeURIComponent(getValue('whatsappMessage'))}`; else throw new Error(_t('errorWhatsAppPhone')); break;
                    case 'vcard':
                        data = `BEGIN:VCARD\nVERSION:3.0\nN:${getValue('vcardLastName')};${getValue('vcardFirstName')}\nFN:${getValue('vcardFirstName')} ${getValue('vcardLastName')}\n` +
                               (getValue('vcardOrg') ? `ORG:${getValue('vcardOrg')}\n` : '') + (getValue('vcardTitle') ? `TITLE:${getValue('vcardTitle')}\n` : '') +
                               (getValue('vcardTelWork') ? `TEL;TYPE=WORK,VOICE:${getValue('vcardTelWork')}\n` : '') + (getValue('vcardTelMobile') ? `TEL;TYPE=CELL,VOICE:${getValue('vcardTelMobile')}\n` : '') +
                               (getValue('vcardEmail') ? `EMAIL:${getValue('vcardEmail')}\n` : '') + (getValue('vcardWebsite') ? `URL:${getValue('vcardWebsite')}\n` : '') +
                               ((getValue('vcardStreet') || getValue('vcardCity') || getValue('vcardState') || getValue('vcardZip') || getValue('vcardCountry')) ? `ADR;TYPE=WORK:;;${getValue('vcardStreet')};${getValue('vcardCity')};${getValue('vcardState')};${getValue('vcardZip')};${getValue('vcardCountry')}\n` : '') +
                               (getValue('vcardNote') ? `NOTE:${getValue('vcardNote')}\n` : '') + `END:VCARD`;
                        break;
                    case 'mecard':
                        data = "MECARD:" + (getValue('mecardName') ? `N:${getValue('mecardName')};`:'') + (getValue('mecardPhone') ? `TEL:${getValue('mecardPhone')};`:'') +
                               (getValue('mecardEmail') ? `EMAIL:${getValue('mecardEmail')};`:'') + (getValue('mecardAddress') ? `ADR:${getValue('mecardAddress')};`:'') +
                               (getValue('mecardNickname') ? `NICKNAME:${getValue('mecardNickname')};`:'') + (getValue('mecardBirthday') ? `BDAY:${getValue('mecardBirthday')};`:'') +
                               (getValue('mecardUrl') ? `URL:${getValue('mecardUrl')};`:'') + (getValue('mecardNote') ? `NOTE:${getValue('mecardNote')};`:'') + ";";
                        data = data.replace(/;;/g, ';');
                        break;
                    case 'wifi': data = `WIFI:T:${getValue('wifiEncryption')};S:${getValue('wifiSsid')};P:${getValue('wifiPassword')};${getValue('wifiHidden') ? 'H:true;' : ''};`; break;
                    case 'location': data = `geo:${getValue('locLatitude')},${getValue('locLongitude')}`; break;
                    case 'event':
                        const summary = getValue('eventSummary'); const startISO = getValue('eventStartDate'); const endISO = getValue('eventEndDate');
                        if (!startISO || !endISO) throw new Error("Event start/end dates required.");
                        const formatDate = (iso) => new Date(iso).toISOString().replace(/-|:|\.\d{3}/g, '');
                        data = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//UnlimitedQRCode//EN\nBEGIN:VEVENT\nSUMMARY:${summary}\nDTSTART:${formatDate(startISO)}\nDTEND:${formatDate(endISO)}\n` +
                               (getValue('eventLocation') ? `LOCATION:${getValue('eventLocation')}\n` : '') + (getValue('eventDescription') ? `DESCRIPTION:${getValue('eventDescription')}\n` : '') + `END:VEVENT\nEND:VCALENDAR`;
                        break;
                    case 'paypal': let ppUrl = `https://paypal.me/${getValue('paypalUser')}`; if (getValue('paypalAmount')) ppUrl += `/${getValue('paypalAmount')}`; data = ppUrl; break;
                    case 'bitcoin':
                        let btc = `bitcoin:${getValue('bitcoinAddress')}`; let btcParams = [];
                        if (getValue('bitcoinAmount')) btcParams.push(`amount=${getValue('bitcoinAmount')}`); if (getValue('bitcoinLabel')) btcParams.push(`label=${encodeURIComponent(getValue('bitcoinLabel'))}`);
                        if (getValue('bitcoinMessage')) btcParams.push(`message=${encodeURIComponent(getValue('bitcoinMessage'))}`); if (btcParams.length > 0) btc += `?${btcParams.join('&')}`; data = btc;
                        break;
                    case 'facebook': data = `https://www.facebook.com/${getValue('socialProfile')}`; break;
                    case 'twitter': data = `https://x.com/${getValue('socialProfile')}`; break;
                    case 'instagram': data = `https://www.instagram.com/${getValue('socialProfile')}`; break;
                    case 'linkedin': let li = getValue('socialProfile'); if (!li.startsWith('http') && (li.includes('in/') || li.includes('company/'))) data = `https://www.linkedin.com/${li}`; else if (!li.startsWith('http')) data = `https://www.linkedin.com/in/${li}`; else data = li; break;
                    case 'youtube': let yt = getValue('socialProfile'); if (!yt.startsWith('http')) { if (yt.length === 24 && (yt.startsWith('UC') || yt.startsWith('HC'))) data = `https://www.youtube.com/channel/${yt}`; else if (yt.length === 11) data = `https://www.youtube.com/watch?v=${yt}`; else data = `https://www.youtube.com/@${yt.startsWith('@') ? yt.substring(1) : yt }`; } else data = yt; break;
                    default: throw new Error(_t('errorInvalidContent'));
                }
                const firstReqFieldDef = contentFieldDefinitions[type]?.find(f => f.required);
                if (firstReqFieldDef && !getValue(firstReqFieldDef.id)) { throw new Error(`${_t(firstReqFieldDef.labelKey)} ${_t('errorRequiredField')}`); }
                return data;
            } catch (error) {
                console.error("LOG: Error getting QR data:", error);
                qrDataPreview.textContent = `${_t('errorGetData')} ${error.message}`;
                qrCodeContainer.innerHTML = `<p style="color:red;">${_t('errorGetData')} ${error.message}</p>`;
                qrCanvasWithFrame.style.display = 'none';
                return null;
            }
        }

        function generateQrCode(isForDownload = false, downloadOptions = {}) {
            const data = getQrData();
            if (data === null || (data.trim() === "" && !isForDownload) ) {
                 if (qrCodeInstance && !isForDownload) {
                    qrCodeContainer.innerHTML = '';
                    qrCanvasWithFrame.getContext('2d').clearRect(0, 0, qrCanvasWithFrame.width, qrCanvasWithFrame.height);
                    qrCanvasWithFrame.style.display = 'none';
                 }
                if (!isForDownload) qrDataPreview.textContent = _t('alertGenerateFirst');
                console.log("LOG: generateQrCode - No data or invalid data for preview.");
                return null;
            }

            if (!isForDownload) {
                qrDataPreview.textContent = `Raw QR Data: ${data.substring(0, 200)}${data.length > 200 ? '...' : ''}`;
            }
            
            let effectiveColorLight = colorLightInput.value;
            if (isForDownload && downloadOptions.transparentBg) {
                effectiveColorLight = "#ffffff00";
            }

            const qrOptions = {
                width: parseInt(qrSizeInput.value), height: parseInt(qrSizeInput.value), data: data, margin: parseInt(qrMarginInput.value),
                qrOptions: { errorCorrectionLevel: errorCorrectionLevelSelect.value, typeNumber: 0 },
                imageOptions: { hideBackgroundDots: logoRemoveBackgroundCheckbox.checked, imageSize: parseFloat(logoSizeInput.value), margin: parseInt(logoMarginInput.value) },
                dotsOptions: { type: dotsStyleSelect.value, color: colorDarkInput.value },
                backgroundOptions: { color: effectiveColorLight, },
                cornersSquareOptions: { type: cornersSquareStyleSelect.value || undefined, color: eyeColorOuterInput.value || colorDarkInput.value },
                cornersDotOptions: { type: cornersDotStyleSelect.value || undefined, color: eyeColorInnerInput.value || colorDarkInput.value },
                image: currentLogo
            };

            if (gradientTypeSelect.value !== 'none') {
                const grad = { type: gradientTypeSelect.value, rotation: parseFloat(gradientRotationInput.value), colorStops: [{ offset: 0, color: gradientColor1Input.value }, { offset: 1, color: gradientColor2Input.value }] };
                qrOptions.dotsOptions.gradient = grad;
                if (!eyeColorOuterInput.value) qrOptions.cornersSquareOptions.gradient = grad; else delete qrOptions.cornersSquareOptions.gradient; // Use solid if specified
                if (!eyeColorInnerInput.value) qrOptions.cornersDotOptions.gradient = grad; else delete qrOptions.cornersDotOptions.gradient; // Use solid if specified
            } else {
                delete qrOptions.dotsOptions.gradient; delete qrOptions.cornersSquareOptions.gradient; delete qrOptions.cornersDotOptions.gradient;
                qrOptions.cornersSquareOptions.color = eyeColorOuterInput.value || colorDarkInput.value;
                qrOptions.cornersDotOptions.color = eyeColorInnerInput.value || colorDarkInput.value;
            }

            if (isForDownload) {
                console.log("LOG: Creating temporary QR instance for download with options:", qrOptions);
                return new QRCodeStyling(qrOptions);
            }

            if (!qrCodeInstance) {
                console.log("LOG: Creating new QR instance for preview.");
                qrCodeInstance = new QRCodeStyling(qrOptions);
                qrCodeContainer.innerHTML = ''; 
                qrCodeInstance.append(qrCodeContainer);
            } else {
                console.log("LOG: Updating existing QR instance for preview.");
                qrCodeInstance.update(qrOptions);
            }
            
            if (enableFrameCheckbox.checked) {
                drawQrWithFrame();
                qrCodeContainer.style.display = 'none';
                qrCanvasWithFrame.style.display = 'block';
            } else {
                qrCanvasWithFrame.getContext('2d').clearRect(0, 0, qrCanvasWithFrame.width, qrCanvasWithFrame.height);
                qrCodeContainer.style.display = 'flex'; 
                qrCanvasWithFrame.style.display = 'none';
            }
            console.log("LOG: QR Code preview updated/generated.");
            return qrCodeInstance;
        }

        function drawQrWithFrame() {
            if (!qrCodeInstance || !qrCodeInstance._canvas || !qrCodeInstance._canvas.getCanvas()) {
                console.error("LOG: QR instance for preview or its canvas not ready for frame drawing.");
                qrCanvasWithFrame.style.display = 'none'; return;
            }
            const originalCanvas = qrCodeInstance._canvas.getCanvas(); const ctx = qrCanvasWithFrame.getContext('2d');
            const frameSz = parseInt(frameSizeInput.value) || 0; const text = frameTextInput.value;
            const textColor = frameTextColorInput.value; const textFontFamily = frameFontInput.value || 'sans-serif';
            const qrRenderedSize = parseInt(qrSizeInput.value);
            let textHeight = 0; const fontSize = Math.max(10, Math.min(24, frameSz * 0.5));
            if (text) textHeight = fontSize * 1.8;
            const totalWidth = qrRenderedSize + 2 * frameSz; const totalHeight = qrRenderedSize + 2 * frameSz + (text ? textHeight : 0) ;
            qrCanvasWithFrame.width = totalWidth; qrCanvasWithFrame.height = totalHeight;
            ctx.fillStyle = frameColorInput.value; ctx.fillRect(0, 0, totalWidth, totalHeight);
            ctx.drawImage(originalCanvas, frameSz, frameSz, qrRenderedSize, qrRenderedSize);
            if (text) {
                ctx.fillStyle = textColor; ctx.font = `${fontSize}px ${textFontFamily}`;
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText(text, totalWidth / 2, qrRenderedSize + frameSz + (textHeight / 2) );
            }
            qrCanvasWithFrame.style.display = 'block';
        }

        logoFileInput.addEventListener('change', (event) => {
            const file = event.target.files[0]; if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => { currentLogo = e.target.result; generateQrCode(); };
            reader.readAsDataURL(file);
        });
        removeLogoBtn.addEventListener('click', () => { currentLogo = null; logoFileInput.value = ''; generateQrCode(); });

        async function handleDownload(extension) {
            const isTransparent = transparentPngCheckbox.checked && extension === 'png' && !enableFrameCheckbox.checked;
            const downloadInstance = generateQrCode(true, { transparentBg: isTransparent });
            if (!downloadInstance && !(enableFrameCheckbox.checked && ['png', 'jpg', 'pdf'].includes(extension))) {
                alert(_t('alertGenerateFirst')); return;
            }
            const filename = `unlimited-qr-${Date.now()}`;
            if (enableFrameCheckbox.checked) {
                if (extension === 'svg') { alert(_t('alertSVGFrameNotSupported')); return; }
                const dataUrl = qrCanvasWithFrame.toDataURL(extension === 'jpg' ? 'image/jpeg' : 'image/png', 0.9); // JPG quality
                if (extension === 'pdf') {
                    const pdf = new jsPDF({orientation: qrCanvasWithFrame.width > qrCanvasWithFrame.height ? 'l' : 'p', unit: 'px', format: [qrCanvasWithFrame.width + 20, qrCanvasWithFrame.height + 20]});
                    pdf.addImage(dataUrl, 'PNG', 10, 10, qrCanvasWithFrame.width, qrCanvasWithFrame.height);
                    pdf.save(`${filename}.pdf`);
                } else { triggerDownload(dataUrl, `${filename}.${extension}`); }
            } else {
                if (extension === 'pdf') {
                    const svgData = await downloadInstance.getRawData('svg'); const svgString = new XMLSerializer().serializeToString(svgData);
                    const pdf = new jsPDF({orientation: downloadInstance._options.width > downloadInstance._options.height ? 'l' : 'p', unit: 'px', format: [downloadInstance._options.width + 20, downloadInstance._options.height + 20]});
                    const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d'); const img = new Image();
                    img.onload = function() {
                        canvas.width = img.width; canvas.height = img.height; ctx.drawImage(img, 0, 0);
                        const pngDataUrl = canvas.toDataURL('image/png');
                        pdf.addImage(pngDataUrl, 'PNG', 10, 10, downloadInstance._options.width, downloadInstance._options.height);
                        pdf.save(`${filename}.pdf`);
                    };
                    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))); // Ensure proper encoding for SVG with special chars
                } else { downloadInstance.download({ name: filename, extension: extension }); }
            }
        }
        downloadPNGButton.addEventListener('click', () => handleDownload('png'));
        downloadJPGButton.addEventListener('click', () => handleDownload('jpg'));
        downloadSVGButton.addEventListener('click', () => handleDownload('svg'));
        downloadPDFButton.addEventListener('click', () => handleDownload('pdf'));
        function triggerDownload(dataUrl, filename) {
            const link = document.createElement('a'); link.href = dataUrl; link.download = filename;
            document.body.appendChild(link); link.click(); document.body.removeChild(link);
        }

        let debounceTimer;
        const debouncedGenerate = () => { clearTimeout(debounceTimer); debounceTimer = setTimeout(generateQrCode, 300); };
        
        const allOptionInputs = [
            colorDarkInput, colorLightInput, gradientTypeSelect, gradientColor1Input, gradientColor2Input, gradientRotationInput,
            eyeColorOuterInput, eyeColorInnerInput, logoSizeInput, logoMarginInput, logoRemoveBackgroundCheckbox, dotsStyleSelect,
            cornersSquareStyleSelect, cornersDotStyleSelect, qrSizeInput, qrMarginInput, errorCorrectionLevelSelect,
            enableFrameCheckbox, frameColorInput, frameSizeInput, frameTextInput, frameTextColorInput, frameFontInput,
            transparentPngCheckbox
        ];
        allOptionInputs.forEach(input => {
            if (!input) { console.warn("LOG: An option input is null, skipping event listener."); return; }
            const eventType = input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'input';
            input.addEventListener(eventType, () => {
                if (input.type === 'file') return; 
                debouncedGenerate();
                if (input.id === 'enableFrame' || input.id === 'transparentPng') updateDownloadOptionsState();
            });
        });

        function updateDownloadOptionsState() {
            const frameEnabled = enableFrameCheckbox.checked;
            transparentPngCheckbox.disabled = frameEnabled;
            transparentPngNote.style.display = frameEnabled ? 'block' : 'none';
            if (frameEnabled) transparentPngCheckbox.checked = false;
        }

        contentTypeSelect.addEventListener('change', (e) => { generateContentFields(e.target.value); debouncedGenerate(); });
        contentFieldsContainer.addEventListener('input', (e) => {
            // console.log("LOG: Input event on contentFieldsContainer, target:", e.target);
            debouncedGenerate(); // Debounce QR generation when content fields change
        });
        generateQrButton.addEventListener('click', () => generateQrCode());

        enableFrameCheckbox.addEventListener('change', () => {
            frameOptionsDiv.classList.toggle('visible', enableFrameCheckbox.checked);
            generateQrCode(); updateDownloadOptionsState();
        });

        const designTemplates = [
            { nameKey: "templateDefault", options: { colorDark: "#000000", colorLight: "#ffffff", gradientType: "none", dotsStyle: "square", eyeColorOuter: "", eyeColorInner: "" } },
            { nameKey: "templateDarkElegant", options: { colorDark: "#2c3e50", colorLight: "#ecf0f1", gradientType: "none", dotsStyle: "rounded", cornersSquareStyle: "extra-rounded", cornersDotStyle: "dot", eyeColorOuter: "#34495e", eyeColorInner: "#34495e" } },
            { nameKey: "templateOceanBlue", options: { colorDark: "#ffffff", colorLight: "#3498db", gradientType: "linear", gradientColor1: "#2980b9", gradientColor2: "#34cfd7", gradientRotation: 45, dotsStyle: "dots", eyeColorOuter: "#ffffff", eyeColorInner: "#ffffff" } },
            { nameKey: "templateSunsetGradient", options: { colorDark: "#000000", colorLight: "#ffffff", gradientType: "radial", gradientColor1: "#e67e22", gradientColor2: "#e74c3c", dotsStyle: "classy", eyeColorOuter: "#c0392b", eyeColorInner: "#d35400" } },
            { nameKey: "templateGreenLeaf", options: { colorDark: "#27ae60", colorLight: "#f6fef9", gradientType: "none", dotsStyle: "extra-rounded", cornersSquareStyle: "extra-rounded", cornersDotStyle: "dot", eyeColorOuter: "#16a085", eyeColorInner: "#16a085" } }
        ];
        function applyTemplate(templateOptions) {
            colorDarkInput.value = templateOptions.colorDark; colorLightInput.value = templateOptions.colorLight;
            gradientTypeSelect.value = templateOptions.gradientType;
            if (templateOptions.gradientType !== 'none') {
                gradientColor1Input.value = templateOptions.gradientColor1 || '#000000'; gradientColor2Input.value = templateOptions.gradientColor2 || '#000000';
                gradientRotationInput.value = templateOptions.gradientRotation || 0;
            }
            dotsStyleSelect.value = templateOptions.dotsStyle;
            cornersSquareStyleSelect.value = templateOptions.cornersSquareStyle || ""; cornersDotStyleSelect.value = templateOptions.cornersDotStyle || "";
            eyeColorOuterInput.value = templateOptions.eyeColorOuter || ""; eyeColorInnerInput.value = templateOptions.eyeColorInner || "";
            generateQrCode();
        }
        function loadDesignTemplates() {
            designTemplatesContainer.innerHTML = '';
            designTemplates.forEach(template => {
                const btn = document.createElement('button'); btn.className = 'template-button'; btn.setAttribute('title', _t(template.nameKey));
                const previewDiv = document.createElement('div'); previewDiv.className = 'template-preview';
                previewDiv.style.backgroundColor = template.options.colorLight;
                const innerDot = document.createElement('div');
                innerDot.style.width = '60%'; innerDot.style.height = '60%';
                if (template.options.gradientType !== 'none') { innerDot.style.background = `linear-gradient(${template.options.gradientRotation || 0}deg, ${template.options.gradientColor1}, ${template.options.gradientColor2})`; }
                else { innerDot.style.backgroundColor = template.options.colorDark; }
                if (['dots', 'rounded', 'extra-rounded', 'classy-rounded'].includes(template.options.dotsStyle)) innerDot.style.borderRadius = '50%';
                if (template.options.dotsStyle === 'classy') innerDot.style.clipPath = 'polygon(50% 0%, 65% 35%, 100% 35%, 75% 60%, 85% 100%, 50% 75%, 15% 100%, 25% 60%, 0% 35%, 35% 35%)';
                previewDiv.appendChild(innerDot);
                const nameSpan = document.createElement('span'); nameSpan.className = 'template-name'; nameSpan.textContent = _t(template.nameKey);
                btn.appendChild(previewDiv); btn.appendChild(nameSpan);
                btn.addEventListener('click', () => applyTemplate(template.options));
                designTemplatesContainer.appendChild(btn);
            });
        }

        languageSelector.addEventListener('change', (e) => setLanguage(e.target.value));
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && translations[savedLang]) { languageSelector.value = savedLang; setLanguage(savedLang); }
        else { const browserLang = navigator.language.split('-')[0]; if (translations[browserLang]) { languageSelector.value = browserLang; setLanguage(browserLang); } else { setLanguage('en'); }}
        
        // Initial calls
        // generateContentFields is called by setLanguage, which is called above.
        // loadDesignTemplates is called by setLanguage.
        updateDownloadOptionsState();
        // Don't auto-generate QR on load, wait for user action or field change.
        // generateQrCode(); // Remove this initial call for now.
        qrDataPreview.textContent = _t('qrDataPreviewPlaceholder'); // Set initial placeholder
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Initialize first tab
        const activeTabLink = document.querySelector('.tab-link.active');
        if (activeTabLink) {
            openTab({ currentTarget: activeTabLink }, activeTabLink.id.replace('Link', '')); // Assuming tab id is like 'tabColors' and link id 'tabColorsLink' - needs correction if not the case
        } else if (document.querySelector('.tab-link')) {
            const firstTabLink = document.querySelector('.tab-link');
             // The openTab function expects an event and the tabName (e.g., 'tabColors')
            // The tabName should be derived from the button's onclick attribute or a data attribute.
            // Let's assume the first tab is 'tabColors' based on HTML.
            const firstTabContentId = 'tabColors'; 
            const firstTabButton = document.querySelector(`.tab-link[onclick*="'${firstTabContentId}'"]`);
            if(firstTabButton) {
                openTab({ currentTarget: firstTabButton }, firstTabContentId);
                firstTabButton.classList.add('active'); // Ensure it's visually active
            }
        }
    });

    // Tab switching logic (Global scope as it's called by HTML onclick)
    function openTab(evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove("active");
            tabcontent[i].style.display = "none"; // Hide all first
        }
        tablinks = document.getElementsByClassName("tab-link");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        
        const activeTabContent = document.getElementById(tabName);
        if (activeTabContent) {
            activeTabContent.style.display = "block"; // Show the target tab
            activeTabContent.classList.add("active");
        }
        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add("active");
        }
        console.log("LOG: Switched to tab:", tabName);
    }
    // --- End JavaScript ---