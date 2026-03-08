Instead of only one SOP, your AI should perform **conditional investigation branching**.

Your workflow becomes:

Case Input  
     ↓  
AI extracts indicators (IOCs)  
     ↓  
AI classifies crime type  
     ↓  
AI runs investigation modules  
     ↓  
AI correlates results  
     ↓  
Action suggestions for officer

IOC \= Indicators of Compromise (phone number, domain, IP, bank account, etc.)

---

**1️⃣ Multi-Condition Investigation Logic (What you want)**

Example case:

Victim paid ₹30,000 on a fake hotel website.

AI should detect **multiple investigation paths simultaneously**.

Crime Type: Financial Fraud  
Linked Category: Phishing Website

Then AI launches investigation modules:

Domain Investigation  
Transaction Investigation  
Phone Number Intelligence  
Data Leak Check  
---

**2️⃣ Investigation Modules Your AI Should Run**

**🌐 Domain Investigation Module**

If a **website URL** is found.

AI checks:

WHOIS data  
Domain registration date  
Registrar company  
Registrant email  
Domain IP address  
Hosting provider  
Server location

Example result:

Domain: hotelbooking-india.com  
Created: 12 days ago  
Registrar: Namecheap  
Server IP: 103.xx.xx.xx  
Location: Singapore  
Hosting: Cloud VPS  
Risk: HIGH (new domain)

This helps identify **phishing infrastructure**.

---

**🌍 IP Intelligence Module**

If AI gets an IP address.

Checks:

IP geolocation  
ISP  
ASN  
Hosting provider  
Known malicious activity

Example:

IP: 103.xx.xx.xx  
Location: Singapore  
ISP: DigitalOcean  
Usage: VPS Hosting  
Flag: Possible phishing infrastructure  
---

**📱 Phone Number Intelligence Module**

If a **phone number** appears.

AI checks:

Telecom provider  
Circle/state  
Truecaller name  
Linked WhatsApp account  
Previous complaints

Example:

Phone: \+91 88xxxxxxx  
Provider: Airtel  
Circle: Bihar  
Truecaller name: Rahul Sharma  
Reported scams: 7  
---

**🧾 Data Breach Intelligence**

If email or phone appears.

AI checks data leak sources like:

* HaveIBeenPwned

Example:

Email: victim@gmail.com  
Data breach detected:  
LinkedIn breach  
Adobe breach

This helps explain **how attacker got victim data**.

---

**💰 Transaction Intelligence**

If a **bank account or UPI ID** exists.

AI checks:

Beneficiary bank  
UPI provider  
Linked bank accounts  
Transaction chain  
Possible mule accounts

Example:

UPI ID: quickpay@upi  
Bank: Yes Bank  
Account holder: Rakesh Kumar  
Previous fraud reports: 12  
---

**3️⃣ Cross-Correlation (Very Important)**

The real power comes when AI **connects the evidence**.

Example:

Phone number used on website  
     ↓  
Same number used in UPI ID  
     ↓  
UPI linked to bank account  
     ↓  
Bank account linked to 8 fraud cases

AI output:

Possible fraud network detected  
Linked cases: 8  
Suspect cluster identified

Judges will LOVE this.

---

**4️⃣ AI Investigation Flow (Final System)**

Officer reports case  
        ↓  
AI extracts entities  
(phone, domain, email, bank, IP)  
        ↓  
AI runs intelligence modules  
        ↓  
AI correlates evidence  
        ↓  
AI shows investigation steps

Example output for officer:

Investigation Summary

Fraud Type: Financial Fraud via Phishing Website

Indicators Found  
Domain: fakehotelbooking.com  
Phone: \+91 88xxxxxx  
UPI: hotelpay@upi

Findings  
Domain created 5 days ago  
Phone linked to 4 complaints  
UPI linked to mule account

Recommended Actions  
1\. Freeze beneficiary bank account  
2\. Send domain takedown request  
3\. Request telecom KYC data  
4\. Notify CERT-In  
---

**5️⃣ Investigation Sources Your AI Can Use**

For hackathon demo you can simulate these.

**Domain Intelligence**

WHOIS  
VirusTotal  
URLScan  
PhishTank

**IP Intelligence**

AbuseIPDB  
IPinfo  
Shodan

**Phone Intelligence**

Truecaller  
Telecom circle database  
WhatsApp profile

**Breach Intelligence**

HaveIBeenPwned  
DeHashed

**Fraud Infrastructure**

Scam domain lists  
Phishing databases  
---

**6️⃣ AI Prompt Logic Example**

Your Claude AI can use logic like:

If input contains URL → run domain investigation  
If input contains phone number → run telecom lookup  
If input contains bank/UPI → run transaction investigation  
If input contains email → run breach check

This is called **indicator-based investigation automation**.

---

**7️⃣ One Powerful Feature You Should Add**

Your AI should generate an **Investigation Report automatically**.

Example:

Cybercrime Investigation Summary

Case Type: Phishing Financial Fraud

Indicators Identified  
Domain: fakehotelbooking.com  
Phone: \+91 88xxxxxx  
UPI: hotelpay@upi

Risk Score: HIGH

Recommended Police Actions  
1\. Freeze bank account  
2\. Request telecom KYC  
3\. Send domain takedown  
4\. Notify CERT-In

That will make your project look **like a real cybercrime investigation tool**.

---

✅ **Conclusion**

Your idea of checking:

* Domain  
* IP  
* ISP  
* Phone number  
* Truecaller  
* Data breaches

Yes Sir — **some information can be extracted for free**, but **not everything**. Most cyber-intelligence sources have **free tiers with limits**. For a **hackathon prototype**, free sources are usually enough. 👍

I'll explain what you can realistically get **free vs paid**.

---

**1️⃣ Domain Information (Free ✅)**

You can get domain data using **WHOIS services**.

Information available:

* Domain registrar  
* Domain creation date  
* Expiry date  
* Name servers  
* Sometimes registrant country

Tools:

* [https://whois.domaintools.com](https://whois.domaintools.com)  
* [https://who.is](https://who.is)  
* [https://api.ipify.org](https://api.ipify.org) (IP lookup)  
* [https://ipinfo.io](https://ipinfo.io)

Example result:

Domain: fakehotelbooking.com  
Registrar: Namecheap  
Created: 12 March 2026  
Country: Iceland

This is **fully free**.

---

**2️⃣ Domain → IP Mapping (Free ✅)**

You can resolve the **IP address of a domain**.

Tools:

* DNS lookup  
* nslookup  
* ipinfo API

Example:

Domain: fakehotelbooking.com  
IP: 103.152.xxx.xxx  
Hosting: DigitalOcean  
Location: Singapore

Free.

---

**3️⃣ IP Intelligence (Partially Free ⚠️)**

Services:

* AbuseIPDB  
* IPinfo  
* Shodan

Free data usually includes:

* Country  
* ISP  
* ASN  
* Hosting provider

Example:

IP: 103.xxx.xxx.xxx  
Country: Singapore  
ISP: DigitalOcean  
Usage: VPS hosting

Advanced threat intelligence usually requires **paid plans**.

---

**4️⃣ Data Breach Lookup (Free ✅)**

HaveIBeenPwned allows **free search for breaches**.

You can check:

* email  
* sometimes domain

Example:

Email: victim@gmail.com

Breaches found:  
LinkedIn 2016  
Adobe 2013

API is limited but usable.

---

**5️⃣ Phone Number Intelligence (Limited ⚠️)**

Truecaller **does not provide official free API**.

Options:

* Manual lookup  
* community databases  
* telecom prefix lookup

Free info possible:

Phone: \+91 88xxxxxxx  
Provider: Airtel  
Circle: Bihar

But **Truecaller name lookup via API is restricted**.

For hackathon you can simulate it.

---

**6️⃣ Phishing Detection (Free Tier)**

Free services:

* VirusTotal  
* PhishTank  
* URLScan

Example:

Domain flagged: phishing  
Reports: 12

VirusTotal free API works but has **rate limits**.

---

**7️⃣ Bank / UPI Intelligence (Not Public ❌)**

Real bank data is **not publicly accessible**.

Police normally obtain it through:

* bank requests  
* cybercrime portal  
* legal notice

For your prototype AI can just say:

Recommended action:  
Send bank freeze request  
---

**8️⃣ OSINT Tools Investigators Use**

Many investigators use free OSINT tools.

Examples:

* Maltego  
* Spiderfoot  
* theHarvester  
* Recon-ng

These gather intelligence from many sources.

---

**Best Strategy for Your Hackathon**

You **do not need real APIs for everything**.

For demo you can combine:

**Real APIs**

* IPinfo  
* WHOIS  
* HaveIBeenPwned  
* VirusTotal

**Simulated Data**

* Truecaller lookup  
* Bank account data  
* telecom KYC

Judges care more about **logic and workflow**, not API accuracy.

---

**Example Investigation Flow Your AI Can Show**

Officer inputs:

Victim paid on fakehotelbooking.com  
Phone: \+91 88xxxxxx  
UPI: hotelpay@upi

AI response:

Domain Analysis  
Created 10 days ago  
Hosted on DigitalOcean

IP Intelligence  
Location: Singapore  
ISP: DigitalOcean

Phone Intelligence  
Provider: Airtel  
Circle: Bihar

Risk Score: HIGH

Recommended Actions  
1\. Freeze beneficiary bank account  
2\. Request telecom subscriber details  
3\. Send domain takedown request

Your AI should perform **three main tasks** after investigation:

1️⃣ **Generate Investigation Report**  
2️⃣ **Suggest required authorities to contact**  
3️⃣ **Generate email/letter templates automatically**

Below is a **clear structure you can implement in your system.**

---

# **1️⃣ AI Generated Case Investigation Report**

After the officer enters case details and AI runs analysis, it should generate a **structured report**.

### **Example Output**

CYBER-SATHI AI  
Preliminary Cybercrime Investigation Report

Case ID: RJ-CC-2026-102  
Date: 25 March 2026

Victim Details  
Name: Rahul Sharma  
Phone: \+91 XXXXXXXX  
Email: rahul@gmail.com

Incident Details  
Fraud Type: Financial Fraud (Phishing Website)  
Amount Lost: ₹50,000  
Transaction Date: 22 March 2026

Indicators Identified  
Website: fakehotelbooking.com  
Phone Number Used: \+91 88XXXXXX  
UPI ID: hotelpay@upi  
IP Address: 103.xxx.xxx.xxx

Technical Analysis  
Domain Created: 10 days ago  
Hosting Provider: DigitalOcean  
Server Location: Singapore  
Phone Telecom Provider: Airtel  
Circle: Bihar

Risk Assessment  
High probability of organized phishing activity.

Recommended Actions  
1\. Freeze beneficiary bank account  
2\. Send telecom subscriber details request  
3\. Request domain takedown  
4\. Notify CERT-In

Generated by Cyber-Sathi AI  
Police officer can **download this as PDF**.

---

# **2️⃣ AI Suggests Who to Contact**

After analysis, AI should identify **relevant organizations**.

Example:

Authorities to Contact

Bank Nodal Officer  
Purpose: Freeze fraudulent account

Telecom Operator  
Purpose: Obtain subscriber KYC details

Domain Registrar  
Purpose: Suspend phishing website

CERT-In  
Purpose: National cyber threat reporting  
---

# **3️⃣ AI Generates Email Automatically**

Example email to **Bank Nodal Officer**.

Subject: Urgent Request to Freeze Fraudulent Bank Account

Dear Sir/Madam,

This is to inform you that a cyber fraud case has been reported at our police station.

Victim Name: Rahul Sharma  
Phone Number: \+91 XXXXXXXX  
Transaction Amount: ₹50,000  
Transaction ID: TXN4582932  
UPI ID Used: hotelpay@upi

The amount was transferred to the following account suspected to be involved in cyber fraud.

We request you to immediately freeze the beneficiary account and provide transaction details for investigation.

Case ID: RJ-CC-2026-102

Regards  
Investigating Officer  
Cyber Crime Cell  
Rajasthan Police  
AI fills **all details automatically**.

---

# **4️⃣ AI Generates Telecom Data Request**

Subject: Request for Subscriber Information

Dear Telecom Nodal Officer,

During investigation of a cyber fraud case, the following mobile number has been identified as suspicious.

Phone Number: \+91 88XXXXXX

Kindly provide the following details:

1\. Subscriber KYC details  
2\. Activation date  
3\. IMEI history  
4\. Call Detail Records

Case Reference: RJ-CC-2026-102

Regards  
Investigating Officer  
Cyber Crime Cell  
---

# **5️⃣ AI Suggests Contact Information**

Your AI can maintain a **nodal officer database**.

Example:

Suggested Contact

Bank: State Bank of India  
Fraud Nodal Email: epgcomplaints@sbi.co.in  
Phone: 1800-425-3800

Telecom: Airtel  
Nodal Email: nodalofficer@airtel.com

Domain Registrar: Namecheap  
Abuse Email: abuse@namecheap.com  
Officer can just **click and send email**.

---

# **6️⃣ Investigation Dashboard Flow**

Your system should work like this:

Officer enters case  
      ↓  
AI performs investigation  
      ↓  
AI generates case report  
      ↓  
AI suggests authorities  
      ↓  
AI generates emails/letters  
---

# **7️⃣ Features That Will Impress Hackathon Judges**

Your AI system will provide:

✔ Investigation guidance  
✔ Evidence analysis  
✔ Case report generation  
✔ Legal communication templates  
✔ Authority contact suggestions

This looks like **a real cybercrime investigation assistant for police**, exactly matching the goal of helping officers handle cases efficiently.

#       **How This Feature Should Work**

Your system workflow should look like this:

Officer uploads screenshot  
        ↓  
AI reads the image (OCR)  
        ↓  
AI extracts entities  
        ↓  
AI classifies the indicators  
        ↓  
AI adds them to investigation report

Example screenshot from victim chat.

AI automatically extracts:

Phone Number: \+91 8892345678  
UPI ID: quickpay@upi  
Website: quickprofit-invest.com  
Transaction ID: TXN4523891  
Telegram ID: @crypto\_admin

These become **investigation indicators**.

---

**Step 1 — Screenshot Upload**

Your chat portal should have a button:

Upload Evidence

Supported files:

* PNG  
* JPG  
* PDF  
* Screenshot  
* Chat export

Officer uploads screenshot from:

* WhatsApp  
* Telegram  
* Bank app  
* SMS  
* Browser

---

**Step 2 — OCR (Text Extraction)**

AI reads text from the screenshot.

Tools you can use:

* **Tesseract OCR**  
* **Google Vision API**  
* **EasyOCR**  
* **Azure OCR**

Example extracted text:

Send payment to quickpay@upi  
Amount ₹20,000  
Contact support \+91 8892345678  
Visit www.quickprofit-invest.com  
---

**Step 3 — Entity Extraction**

Now AI identifies **important investigation indicators**.

Your AI should detect:

| Indicator | Example |
| ----- | ----- |
| Phone number | \+91XXXXXXXX |
| UPI ID | name@upi |
| Email | abc@gmail.com |
| Website | scamwebsite.com |
| IP address | 103.xx.xx.xx |
| Telegram ID | @username |
| Bank account | 123456789 |

Example AI output:

Indicators Found:

Phone: \+91 8892345678  
UPI ID: quickpay@upi  
Website: quickprofit-invest.com  
Telegram: @crypto\_admin  
---

**Step 4 — Investigation Trigger**

Once entities are extracted, AI automatically runs investigations.

Example:

Detected Website → Run Domain Intelligence  
Detected Phone → Run Telecom Lookup  
Detected UPI → Start Financial Fraud SOP  
Detected Telegram → Social Media Investigation

This is called **indicator-driven investigation automation**.

---

**Step 5 — Evidence Timeline**

Your system should store extracted evidence.

Example:

Evidence Collected

1\. Screenshot of WhatsApp chat  
2\. Phone number extracted  
3\. Fraud website identified  
4\. UPI ID detected

This becomes part of **case documentation**.

---

**Step 6 — Auto Report Integration**

The extracted data automatically fills the report.

Example:

Investigation Report

Victim Name: Rahul Sharma  
Phone: \+91 XXXXXXXX

Indicators Identified  
Phone: \+91 8892345678  
UPI ID: quickpay@upi  
Website: quickprofit-invest.com  
Telegram: @crypto\_admin

The officer **does not need to type anything manually**.

---

**Example Real Case Flow**

Officer uploads screenshot from victim.

Screenshot text:

Pay ₹50000 to profitfast@upi  
Contact \+91 8892345678  
Website: profitfast-invest.com

AI response:

Evidence Extracted

Phone Number: \+91 8892345678  
UPI ID: profitfast@upi  
Website: profitfast-invest.com

Possible Fraud Type: Financial Fraud via Phishing Website

Recommended Actions  
1\. Freeze beneficiary account  
2\. Investigate domain registration  
3\. Request telecom subscriber details

This looks **extremely impressive in demo**.

---

**Important Tip for Your Hackathon**

In your presentation you should say:

**“Cyber-Sathi AI uses OCR and AI entity extraction to automatically identify investigation indicators from screenshots such as phone numbers, bank accounts, URLs, and suspect IDs, reducing manual investigation time for police officers.”**

Judges will understand **this solves a real police problem**.

---

**One Feature That Will Make Your Project 10× Better**

Right now your AI extracts indicators.

But you can also make it do **Fraud Pattern Detection**.

Example:

Phone number \+91 8892345678 appears in 12 cases  
Same domain used in 7 scams

Then AI says:

Possible organized cybercrime network detected

This will make your project look like a **real cyber intelligence platform**.

---

If you want Sir, I can also help you build **the exact AI pipeline for this feature**:

Screenshot  
   ↓  
OCR  
   ↓  
Entity Extraction  
   ↓  
Indicator Intelligence  
   ↓  
Investigation Assistant

This will help your team **actually implement it quickly for RECKON 7.0.**

**You do NOT need to train Claude with datasets for this.**  
Claude (or any LLM) is already trained. You only need to **guide it using prompts \+ knowledge base (RAG)**.

Think of it like **teaching the AI rules**, not training a new model.

---

# **Correct Method to Teach Your Local ClaudeBot**

Use **3 components**:

1️⃣ **System Prompt (AI behavior rules)**  
2️⃣ **Knowledge Base / Documents (SOPs, investigation procedures)**  
3️⃣ **External tools/APIs (OSINT lookups)**

Architecture:

Officer Input  
      ↓  
Claude AI  
      ↓  
Knowledge Base (SOPs)  
      ↓  
OSINT Tools  
      ↓  
Structured Response  
---

# **1️⃣ System Prompt (Most Important)**

This tells Claude **how it should behave**.

Example system prompt:

You are Cyber-Sathi AI, an investigation assistant designed to help police officers investigate cybercrime cases.

Your role is to guide officers step-by-step through cybercrime investigations.

When a case is provided you must:

1\. Identify the crime category  
2\. Extract indicators (phone numbers, URLs, emails, bank accounts)  
3\. Suggest investigation steps based on cybercrime SOPs  
4\. Recommend evidence collection  
5\. Suggest authorities to contact  
6\. Generate investigation reports and official emails if required

Always provide responses in structured format.

Crime Categories:  
1\. Financial Fraud  
2\. Sextortion / Image Abuse  
3\. Account Takeover  
4\. Device Theft  
5\. Phishing / Fake Website

Always assist non-technical police officers with simple explanations.  
This alone will make Claude behave like **your investigation assistant**.

---

# **2️⃣ Knowledge Base (Where SOPs Go)**

Yes — here you can use **PDF, documents, or text files**.

Example knowledge files:

financial\_fraud\_sop.pdf  
sextortion\_sop.pdf  
phishing\_investigation\_sop.pdf  
telecom\_data\_request\_templates.pdf  
bank\_freeze\_request\_templates.pdf  
Claude will **search these documents when answering questions**.

Example SOP content:

Financial Fraud Investigation SOP

Step 1: Collect evidence  
\- Transaction ID  
\- UPI ID  
\- Victim bank details

Step 2: Immediate actions  
\- Freeze beneficiary bank account  
\- Report to cybercrime portal

Step 3: Investigation  
\- Identify mule accounts  
\- Trace money flow  
Claude will automatically use this.

This technique is called **RAG (Retrieval Augmented Generation)**.

---

# **3️⃣ Entity Extraction (Screenshot Feature)**

You don't teach Claude this using datasets.

Instead:

Screenshot  
      ↓  
OCR  
      ↓  
Extract text  
      ↓  
Claude analyzes text  
Example OCR output:

Send payment to quickpay@upi  
Contact \+91 8892345678  
Visit quickprofit-invest.com  
Claude prompt:

Extract investigation indicators from the following text.  
Return phone numbers, URLs, UPI IDs, emails, and transaction IDs.  
Claude returns structured data.

---

# **4️⃣ Investigation Logic**

You also give Claude **logic instructions**.

Example:

If a URL is detected → perform domain investigation  
If a phone number is detected → suggest telecom lookup  
If UPI ID detected → financial fraud investigation  
If email detected → check breach databases  
Claude will follow these rules.

---

# **5️⃣ Email & Report Generation**

No training required.

Just prompt Claude:

Generate a cybercrime investigation report using the following details:

Victim name:  
Phone:  
Fraud amount:  
Indicators found:  
Claude will generate the report automatically.

---

# **6️⃣ OSINT Integration**

Claude itself does not fetch OSINT data.

You connect APIs like:

IPinfo  
WHOIS  
VirusTotal  
HaveIBeenPwned  
Your backend fetches the data and sends it to Claude.

Example:

Domain analysis result:  
Domain: fakehotelbooking.com  
Created: 10 days ago  
IP: 103.xx.xx.xx  
Location: Singapore  
Claude then explains it.

---

# **What You Should Actually Prepare**

For your project you mainly need:

### **1️⃣ SOP Document**

Cybercrime Investigation SOP

### **2️⃣ Email Templates**

bank\_freeze\_request.txt  
telecom\_data\_request.txt  
domain\_takedown\_request.txt

### **3️⃣ Crime Category Guide**

fraud  
sextortion  
account hacking  
phone theft  
phishing  
Put them into your **knowledge base**.

---

# **Important: You Do NOT Need**

❌ ML training  
❌ Large datasets  
❌ Model fine-tuning

Claude is already trained.

You are building **an AI assistant system around it**.

---

# **Final Architecture for Your Project**

Chat Portal  
     ↓  
Claude AI  
     ↓  
Knowledge Base (SOPs)  
     ↓  
OCR Engine  
     ↓  
OSINT APIs  
     ↓  
Report Generator  
---

# **My Honest Advice**

Your project is actually becoming **very strong for RECKON 7.0**.

But there is **one feature missing that could make your project 10× stronger**:

👉 **Cybercrime Pattern Detection**

Example:

Same phone number used in 12 fraud cases  
Same domain used in 5 scams  
AI detects **fraud networks automatically**.

This would make your system look like a **real cyber intelligence platform** used by law enforcement.

#                       **Best Approach for Your AI**

Use this architecture:

User (Police Officer)  
        ↓  
Chat Portal  
        ↓  
Claude AI (Reasoning)  
        ↓  
Knowledge Base (SOPs, laws, templates)  
        ↓  
Tools  
(OCR \+ OSINT APIs \+ Report Generator)

Claude acts as the **brain**, while tools provide **data and capabilities**.

---

**1️⃣ Use RAG (Retrieval Augmented Generation)**

Instead of training the AI, give it **documents it can search**.

Documents you should prepare:

**Investigation SOPs**

* Financial fraud investigation steps  
* Sextortion investigation  
* Account hacking investigation  
* Phone theft investigation  
* Phishing website investigation

**Legal References**

* IT Act sections  
* IPC sections related to cybercrime

**Email Templates**

* Bank freeze request  
* Telecom subscriber data request  
* Domain takedown request

**Nodal Officer Contacts**

* Bank fraud nodal officers  
* Telecom nodal officers  
* CERT-In contacts

Claude will **read these documents and use them when answering**.

---

**2️⃣ Build Investigation Logic (Rules)**

Instead of training, create **rules for the AI**.

Example logic:

If input contains URL → run domain investigation  
If input contains phone number → telecom lookup  
If input contains UPI ID → financial fraud SOP  
If screenshot uploaded → run OCR extraction

Claude follows these rules to guide investigation.

---

**3️⃣ Evidence Extraction Pipeline**

For your **main feature (screenshot analysis)**:

Screenshot  
   ↓  
OCR Engine (EasyOCR / Tesseract)  
   ↓  
Extracted Text  
   ↓  
Claude Entity Extraction  
   ↓  
Indicators  
(phone, URL, bank, email)

Claude then starts investigation based on those indicators.

---

**4️⃣ OSINT Tool Integration**

Your backend should call investigation tools like:

Domain lookup  
IP intelligence  
Phone prefix lookup  
Data breach check

Example tools:

* WHOIS  
* IPinfo  
* VirusTotal  
* HaveIBeenPwned

Claude then interprets the results.

---

**5️⃣ Automatic Report Generation**

Claude generates structured outputs:

**Investigation Report**

* Victim details  
* Indicators found  
* Technical findings  
* Recommended actions

**Official Emails**

* Bank freeze request  
* Telecom data request  
* Domain takedown notice

No training required — just **prompt templates**.

---

**6️⃣ Create a System Prompt (Very Important)**

Your Claude AI must have a **strong system prompt** defining its role.

Example:

You are Cyber-Sathi AI, a cybercrime investigation assistant designed to help police officers.

Your tasks:  
1\. Identify cybercrime category  
2\. Extract indicators from evidence  
3\. Guide investigation using SOPs  
4\. Suggest legal actions  
5\. Generate investigation reports  
6\. Draft official communication emails

Always respond in structured investigation format.

This defines **how the AI behaves**.

---

**7️⃣ Optional: Small Dataset for Classification**

You may create a **small dataset only for crime classification**.

Example:

| Case Description | Category |
| ----- | ----- |
| UPI payment fraud | Financial Fraud |
| Instagram account hacked | Account Takeover |
| Nude photo blackmail | Sextortion |
| Fake hotel booking site | Phishing |
| Phone stolen | Device Theft |

But this is **optional**, because LLMs already classify well.

---

**Recommended Tech Stack for Your Project**

Frontend  
React / Next.js

Backend  
Python FastAPI

AI  
Claude

OCR  
EasyOCR or Tesseract

Database  
PostgreSQL

Vector Database  
Chroma / Pinecone

---

**What Judges Will See**

Your system will demonstrate:

1️⃣ AI chat investigation  
2️⃣ Screenshot evidence extraction  
3️⃣ Automated intelligence lookups  
4️⃣ Investigation guidance  
5️⃣ Auto report generation

That makes it look like **a real cybercrime investigation platform**.

---

Sir, honestly your project is already **very strong for a hackathon**.  
But there is **one advanced feature that could make your project stand out dramatically**:

**AI Fraud Network Detection**

Example:

Phone \+91 8892345678 appears in 15 fraud cases  
Domain used in multiple scams

AI detects **organized cybercrime networks automatically**.

Sir, adding **AI Fraud Network Detection** is an excellent decision. This feature will make your **Cyber-Sathi AI look like a real cyber intelligence platform**, not just a chatbot. It shows that the AI can **detect organized fraud networks by linking multiple cases together**.

I’ll show you the **working structure step-by-step** so you can implement and also explain it clearly to judges.

---

**AI Fraud Network Detection – Working Structure**

**1️⃣ Indicator Extraction**

First, your system collects **Indicators of Compromise (IOCs)** from the case.

These come from:

* Officer input  
* Screenshot OCR  
* Chat messages  
* Transaction data

Example indicators extracted:

Phone number: \+91 8892345678  
UPI ID: quickpay@upi  
Website: quickprofit-invest.com  
Telegram ID: @crypto\_admin  
IP address: 103.xxx.xxx.xxx

These indicators are the **keys for network detection**.

---

**2️⃣ Indicator Database**

All extracted indicators are stored in a **central database**.

Example structure:

| Case ID | Indicator Type | Value |
| ----- | ----- | ----- |
| CASE001 | Phone | \+91 8892345678 |
| CASE001 | UPI | quickpay@upi |
| CASE002 | Phone | \+91 8892345678 |
| CASE002 | Website | quickprofit-invest.com |
| CASE003 | UPI | quickpay@upi |

This allows the AI to **compare cases automatically**.

---

**3️⃣ Cross-Case Matching**

Now the AI checks:

Does this phone number appear in other cases?  
Does this domain appear in other cases?  
Does this UPI ID appear in other fraud reports?

Example detection:

Phone \+91 8892345678 → found in 7 cases  
UPI quickpay@upi → found in 5 cases  
Domain quickprofit-invest.com → found in 3 cases

Now the AI suspects **a fraud network**.

---

**4️⃣ Relationship Graph (Fraud Network Map)**

Your system should build a **relationship graph**.

Example structure:

Victim A  
   ↓  
UPI quickpay@upi  
   ↓  
Phone \+91 8892345678  
   ↓  
Telegram @crypto\_admin  
   ↓  
Fake Website quickprofit-invest.com

Multiple victims connect to the **same infrastructure**.

This indicates **organized cybercrime**.

---

**5️⃣ Fraud Network Detection Algorithm**

Simple logic for your prototype:

If indicator appears in more than 3 cases  
       ↓  
Mark as suspicious infrastructure  
       ↓  
Cluster related cases

Example:

Cluster ID: FRAUD\_NET\_01

Linked indicators:  
Phone \+91 8892345678  
UPI quickpay@upi  
Domain quickprofit-invest.com

Linked cases:  
CASE001  
CASE002  
CASE004  
CASE007  
---

**6️⃣ AI Investigation Output**

The AI shows the officer:

Fraud Network Detected

Indicators linked to multiple cases:

Phone: \+91 8892345678  
UPI ID: quickpay@upi  
Domain: quickprofit-invest.com

Total linked cases: 7  
Possible organized fraud group.  
---

**7️⃣ Investigation Suggestions**

AI suggests next steps:

Recommended Actions

1\. Freeze beneficiary bank account  
2\. Request telecom subscriber details  
3\. Send domain takedown request  
4\. Investigate linked cases  
5\. Notify cybercrime headquarters  
---

**8️⃣ Visual Network Graph (Optional but impressive)**

Your dashboard can display a **fraud network map**.

Example structure:

        Victim A  
           |  
        quickpay@upi  
        /        \\  
 Victim B      Victim C  
        |  
   \+91 8892345678  
        |  
 quickprofit-invest.com

Judges LOVE visual investigation tools.

---

**9️⃣ Full System Flow with Fraud Detection**

Your final architecture becomes:

Officer submits case  
        ↓  
Evidence extraction  
(OCR \+ entity detection)  
        ↓  
Indicators stored in database  
        ↓  
Cross-case comparison  
        ↓  
Fraud network detection  
        ↓  
Investigation guidance  
        ↓  
Report generation  
---

**Example Real Case**

Officer enters:

Victim paid ₹20,000 to quickpay@upi  
Phone: \+91 8892345678

AI response:

Fraud Network Alert

Phone \+91 8892345678 appears in 8 cases.  
UPI quickpay@upi appears in 6 cases.

Possible organized fraud network detected.

Cluster ID: FRAUD\_NET\_01

This shows **intelligence analysis**, not just investigation.

---

**Why This Feature Is Powerful**

It solves a real police problem:

Police normally investigate **cases individually**.

Your AI will detect **connections between cases automatically**.

This means:

* Faster fraud detection  
* Identification of scam gangs  
* Better national intelligence

---

**How to Explain This to Judges**

You can say:

“Cyber-Sathi AI not only assists investigations but also performs **fraud network detection by correlating indicators across multiple cases**, allowing law enforcement to identify organized cybercrime groups.”

That sounds **very professional**.

---

If you want, Sir, I can also show you **one extremely powerful feature that could make Cyber-Sathi AI the most advanced project in RECKON 7.0**:

**AI Cybercrime Heatmap for Rajasthan** (showing scam hotspots across districts).

Sir, for your **Cyber-Sathi AI investigation assistant**, the best way to “train” it is **not traditional ML training**. Since you are using **Claude**, the correct approach is a **3-layer training/teaching strategy**:

1️⃣ **System Prompt Training (Behavior Rules)**  
2️⃣ **RAG Knowledge Base Training (SOP \+ Investigation Knowledge)**  
3️⃣ **Tool-based Training (OCR \+ OSINT \+ Fraud Detection modules)**

This approach is used in **modern AI assistants and SOC investigation platforms**.

---

# **1️⃣ System Prompt Training (AI Behavior)**

First, define **how your AI should think and respond**.  
This is like giving the AI its **role and investigation framework**.

Example system prompt:

You are Cyber-Sathi AI, a cybercrime investigation assistant designed for police officers.

Your job is to help officers investigate cybercrime cases step-by-step.

When a case is provided:  
1\. Identify the cybercrime category  
2\. Extract indicators (phone numbers, URLs, emails, bank accounts, UPI IDs)  
3\. Suggest investigation steps using cybercrime SOPs  
4\. Recommend evidence collection  
5\. Suggest relevant legal sections  
6\. Generate investigation reports  
7\. Draft official communication emails for banks, telecom companies, and domain registrars.

Always provide clear step-by-step instructions suitable for non-technical police officers.  
This **defines the AI’s investigation behavior**.

---

# **2️⃣ RAG Knowledge Base Training (Most Important)**

Instead of datasets, give the AI **documents containing investigation knowledge**.

This is called **RAG (Retrieval Augmented Generation)**.

Your knowledge base should contain documents like:

### **Cybercrime SOPs**

financial\_fraud\_sop.pdf  
sextortion\_investigation\_sop.pdf  
account\_takeover\_sop.pdf  
device\_theft\_sop.pdf  
phishing\_website\_sop.pdf

### **Legal References**

IT Act sections  
IPC cybercrime sections  
digital evidence handling guidelines

### **Investigation Templates**

bank\_account\_freeze\_request.txt  
telecom\_subscriber\_request.txt  
domain\_takedown\_request.txt

### **Nodal Officer Contacts**

bank\_nodal\_officers.json  
telecom\_nodal\_officers.json  
CERT-In\_contacts.json  
Claude will **search these documents when answering questions**.

---

# **3️⃣ Indicator Extraction Training**

Your AI must learn to extract **investigation indicators**.

Example prompt instruction:

From the provided text extract the following indicators:

Phone numbers  
UPI IDs  
Bank account numbers  
Email addresses  
Websites or URLs  
Telegram or social media IDs  
Transaction IDs  
IP addresses  
Example input text:

Send ₹20000 to quickpay@upi  
Contact \+91 8892345678  
Visit quickprofit-invest.com  
AI output:

Phone: \+91 8892345678  
UPI ID: quickpay@upi  
Website: quickprofit-invest.com  
This is **entity extraction training via prompt engineering**.

---

# **4️⃣ OCR Evidence Pipeline Training**

Your AI should process screenshots using OCR.

Pipeline:

Screenshot uploaded  
      ↓  
OCR extracts text  
      ↓  
Claude analyzes extracted text  
      ↓  
Indicators detected  
Example:

Image → OCR → "Send ₹50000 to profitfast@upi"  
AI extracts:

UPI ID: profitfast@upi  
---

# **5️⃣ Fraud Network Detection Training**

Teach the AI how to detect **linked fraud cases**.

Logic example:

If the same phone number appears in more than 3 cases  
→ mark it as suspicious

If the same UPI ID appears in multiple cases  
→ flag possible mule account

If the same domain appears in multiple fraud reports  
→ mark phishing infrastructure  
Example result:

Fraud Network Detected

Phone: \+91 8892345678  
UPI: quickpay@upi  
Domain: quickprofit-invest.com

Linked Cases: 7  
Possible organized fraud group.  
---

# **6️⃣ Report Generation Training**

Teach the AI to produce **structured investigation reports**.

Example prompt template:

Generate a cybercrime investigation report using:

Victim name:  
Phone number:  
Fraud amount:  
Indicators detected:  
Investigation findings:  
Recommended actions:  
Output example:

Cyber-Sathi AI Investigation Report

Victim Name: Rahul Sharma  
Fraud Type: Financial Fraud  
Amount: ₹50,000

Indicators Identified  
Phone: \+91 8892345678  
UPI: quickpay@upi  
Website: quickprofit-invest.com

Recommended Actions  
1\. Freeze bank account  
2\. Request telecom KYC  
3\. Send domain takedown request  
---

# **Final Training Architecture**

Your AI system should look like this:

Officer Chat Portal  
        ↓  
Claude AI (Reasoning)  
        ↓  
Knowledge Base (SOPs \+ Laws \+ Templates)  
        ↓  
OCR Engine  
        ↓  
Indicator Extraction  
        ↓  
OSINT Tools  
        ↓  
Fraud Network Detection  
        ↓  
Investigation Report Generator  
---

# **What You Actually Need to Prepare**

You mainly need **documents**, not datasets.

Prepare:

1️⃣ Cybercrime SOP document  
2️⃣ Legal section reference document  
3️⃣ Investigation email templates  
4️⃣ Nodal officer contact database  
5️⃣ Fraud detection logic rules

That is enough to **teach your AI how to investigate cases**.

