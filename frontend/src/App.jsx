import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './assets/images/hbclogo.png';
import shoppingBagIcon from './assets/images/shopping-cart.svg';
import userIcon from './assets/images/user-circle.svg';
// import coverImage from './assets/images/cover.jpg';
const coverImage = "https://picsum.photos/seed/cover/800/400";
import footerImage from './assets/images/footerimage.jpeg';

// --- Slider Images ---
import slide1 from './assets/images/slider/1.jpg';
import slide2 from './assets/images/slider/2.jpg';
import slide3 from './assets/images/slider/3.jpg';
import slide4 from './assets/images/slider/4.jpg';
import slide5 from './assets/images/slider/5.jpg';
import slide6 from './assets/images/slider/6.jpg';

// --- Product Images ---
import prod1 from './assets/images/products/1.jpg';
import prod2 from './assets/images/products/2.jpg';
import prod3 from './assets/images/products/3.jpg';
import prod4 from './assets/images/products/4.jpg';
import prod5 from './assets/images/products/5.jpg';
import prod6 from './assets/images/products/6.jpg';
import prod8 from './assets/images/products/8.jpg';

const bdLocations = {
    "Barishal": {
        "Barguna": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"],
        "Barishal": ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barishal Sadar", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
        "Bhola": ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
        "Jhalokati": ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
        "Patuakhali": ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
        "Pirojpur": ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Pirojpur Sadar", "Indurkani"]
    },
    "Chattogram": {
        "Bandarban": ["Ali Kadam", "Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
        "Brahmanbaria": ["Akhaura", "Ashuganj", "Bancharampur", "Brahmanbaria Sadar", "Bijoynagar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"],
        "Chandpur": ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
        "Chattogram": ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Karnaphuli", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda", "Akbar Shah", "Bakalia", "Bandar", "Bayazid Bostami", "Chawkbazar", "Double Mooring", "EPZ", "Halishahar", "Khulshi", "Kotwali", "Pahartali", "Panchlaish", "Patenga", "Sadarghat"],
        "Cumilla": ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Cumilla Adarsha Sadar", "Cumilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Lalmai", "Manoharganj", "Meghna", "Muradnagar", "Nangalkot", "Titas"],
        "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia", "Eidgaon"],
        "Feni": ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Fulgazi", "Parshuram", "Sonagazi"],
        "Khagrachhari": ["Dighinala", "Guimara", "Khagrachhari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
        "Lakshmipur": ["Kamalnagar", "Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati"],
        "Noakhali": ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Noakhali Sadar", "Senbagh", "Sonaimuri", "Subarnachar"],
        "Rangamati": ["Bagaichhari", "Barkal", "Belaichhari", "Juraichhari", "Kaptai", "Langadu", "Naniarchar", "Rajasthali", "Rangamati Sadar", "Kaukhali"]
    },
    "Dhaka": {
        "Dhaka": ["Adabor", "Badda", "Bangshal", "Bimanbandar", "Cantonment", "Chak Bazar", "Dakshinkhan", "Darus Salam", "Demra", "Dhamrai", "Dhanmondi", "Dohar", "Gendaria", "Gulshan", "Hazaribagh", "Jatrabari", "Kadamtali", "Kafrul", "Kalabagan", "Kamrangirchar", "Keraniganj", "Khilgaon", "Khilkhet", "Kotwali", "Lalbagh", "Mirpur", "Mohammadpur", "Motijheel", "Nawabganj", "New Market", "Pallabi", "Paltan", "Ramna", "Rampura", "Sabujbagh", "Savar", "Shah Ali", "Shahbag", "Sher-e-Bangla Nagar", "Shyampur", "Sutrapur", "Tejgaon", "Tejgaon Ind. Area", "Turag", "Uttara", "Uttarkhan", "Vhatara", "Wari"],
        "Faridpur": ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
        "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur", "Tongi"],
        "Gopalganj": ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
        "Kishoreganj": ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
        "Madaripur": ["Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar", "Dasar"],
        "Manikganj": ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shivalaya", "Singair"],
        "Munshiganj": ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"],
        "Narayanganj": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon", "Siddhirganj", "Fatullah"],
        "Narsingdi": ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
        "Rajbari": ["Baliakandi", "Goalandaghat", "Kalukhali", "Pangsha", "Rajbari Sadar"],
        "Shariatpur": ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zajira", "Shakhipur"],
        "Tangail": ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"]
    },
    "Khulna": {
        "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
        "Chuadanga": ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
        "Jashore": ["Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Jashore Sadar", "Manirampur", "Sharsha"],
        "Jhenaidah": ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
        "Khulna": ["Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Terokhada", "Khulna Sadar", "Khalishpur", "Khan Jahan Ali", "Sonadanga"],
        "Kushtia": ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"],
        "Magura": ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
        "Meherpur": ["Gangni", "Meherpur Sadar", "Mujibnagar"],
        "Narail": ["Kalia", "Lohagara", "Narail Sadar"],
        "Satkhira": ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"]
    },
    "Mymensingh": {
        "Jamalpur": ["Bakshiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
        "Mymensingh": ["Bhaluka", "Dhobaura", "Fulbaria", "Gafargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Mymensingh Sadar", "Muktagachha", "Nandail", "Phulpur", "Tara Khanda"],
        "Netrokona": ["Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"],
        "Sherpur": ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"]
    },
    "Rajshahi": {
        "Bogura": ["Adamdighi", "Bogura Sadar", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"],
        "Joypurhat": ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
        "Naogaon": ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
        "Natore": ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Natore Sadar", "Singra", "Naldanga"],
        "Chapai Nawabganj": ["Bholahat", "Gomastapur", "Nachole", "Chapai Nawabganj Sadar", "Shibganj"],
        "Pabna": ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"],
        "Rajshahi": ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Tanore", "Rajshahi Sadar", "Boalia", "Matihar", "Rajpara", "Shah Makhdum"],
        "Sirajganj": ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullahpara"]
    },
    "Rangpur": {
        "Dinajpur": ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Dinajpur Sadar", "Nawabganj", "Parbatipur"],
        "Gaibandha": ["Phulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],
        "Kurigram": ["Bhurungamari", "Char Rajibpur", "Chilmari", "Phulbari", "Kurigram Sadar", "Nageshwari", "Rajarhat", "Raomari", "Ulipur"],
        "Lalmonirhat": ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
        "Nilphamari": ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
        "Panchagarh": ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
        "Rangpur": ["Badarganj", "Gangachhara", "Kaunia", "Rangpur Sadar", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"],
        "Thakurgaon": ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"]
    },
    "Sylhet": {
        "Habiganj": ["Ajmiriganj", "Bahubal", "Baniyachong", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj", "Shaistaganj"],
        "Moulvibazar": ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"],
        "Sunamganj": ["Bishwamvarpur", "Chhatak", "Dakshin Sunamganj", "Derai", "Dharamapasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Sunamganj Sadar", "Tahirpur", "Madhyanagar"],
        "Sylhet": ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Osmani Nagar", "Sylhet Sadar", "Zakiganj"]
    }
};

// Flatten districts for easier access and sort them
const allDistrictsData = {};
Object.values(bdLocations).forEach(division => {
    Object.assign(allDistrictsData, division);
});
const sortedDistrictNames = Object.keys(allDistrictsData).sort();

// --- Translations Object ---
const translations = {
    footer_desc: { en: "Pickles are an essential part of Bengali cuisine. We are committed to delivering that authentic taste to you.", bn: "আচার বাঙালি খাবারের একটি অবিচ্ছেদ্য অংশ। আমরা সেই আসল স্বাদ আপনার কাছে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।" },
    popular_pickles: { en: "Our Popular Pickles", bn: "আমাদের জনপ্রিয় আচার" },
    popular_pickles_desc: { en: "Check out the best selected pickles", bn: "বাছাই করা সেরা আচারগুলো দেখুন" },
    all: { en: "All", bn: "সব" },
    sour: { en: "Sour", bn: "টক" },
    sweet: { en: "Sweet", bn: "মিষ্টি" },
    spicy: { en: "Spicy", bn: "ঝাল" },
    mixed: { en: "Mixed", bn: "মিশ্র" },
    services: { en: "Our Services", bn: "আমাদের সেবাসমূহ" },
    services_desc: { en: "We are committed to delivering the best quality products and customer service", bn: "আমরা সেরা মানের পণ্য এবং গ্রাহক সেবা প্রদানে প্রতিশ্রুতিবদ্ধ" },
    fast_delivery: { en: "Fast Delivery", bn: "দ্রুত ডেলিভারি" },
    fast_delivery_desc: { en: "Fast and reliable home delivery service across Bangladesh", bn: "সারা বাংলাদেশে দ্রুত এবং নির্ভরযোগ্য হোম ডেলিভারি সার্ভিস" },
    help_support: { en: "Help & Support", bn: "হেল্প ও সাপোর্ট" },
    help_support_desc: { en: "Our support team is here for you 24/7 for any needs", bn: "যেকোনো প্রয়োজনে আমাদের সাপোর্ট টিম রয়েছে আপনার পাশে, ২৪/৭" },
    secure_payment: { en: "Secure Payment", bn: "নিরাপদ পেমেন্ট" },
    secure_payment_desc: { en: "Safe digital payments including Cash on Delivery", bn: "ক্যাশ অন ডেলিভারি সহ সকল প্রকার ডিজিটাল পেমেন্ট নিরাপদ" },

    food_importer_v2: { en: "Direct Food Importer", bn: "সরাসরি নিজস্ব তত্ত্বাবধানে খাদ্য আমদানিকারক" },
    food_importer_desc_v2: { en: "Products are imported under own supervision", bn: "নিজস্ব তদারকিতে পণ্য আমদানি করা হয়" },
    uninterrupted_support_v2: { en: "Uninterrupted Customer Service", bn: "নিরবিচ্ছিন্ন গ্রাহক সেবা" },
    uninterrupted_support_desc_v2: { en: "24/7 customer support or service provided day and night", bn: "দিন-রাত ২৪ ঘণ্টা কাস্টমার সাপোর্ট বা সেবা প্রদান" },
    fast_delivery_v2: { en: "Fast Delivery", bn: "দ্রুত ডেলিভারি" },
    fast_delivery_desc_v2: { en: "Ensuring fast delivery across Bangladesh in just 33 hours", bn: "সারা বাংলাদেশে ফাস্ট ডেলিভারি নিশ্চিত করছি মাত্র ৩৩ ঘণ্টায়" },
    free_return_v2: { en: "Free Return Service", bn: "ফ্রি রিটার্ন সার্ভিস" },
    free_return_desc_v2: { en: "Facility of free return if the product is not liked for any reason or if there is a problem.", bn: "কোনো কারণে পণ্য পছন্দ না হলে বা সমস্যা থাকলে বিনামূল্যে ফেরতের সুবিধা।" },
    food_safety: { en: "Adherence to Food Safety Standards", bn: "সর্বোচ্চ খাদ্য নিরাপত্তা মান অনুসরণ" },
    food_safety_desc: { en: "Ensuring food safety in a healthy way.", bn: "স্বাস্থ্যসম্মত উপায়ে খাদ্য সুরক্ষা নিশ্চিত করা।" },
    original_guarantee_v2: { en: "100% Original Product Guarantee", bn: "শতভাগ অরিজিনাল প্রোডাক্টের নিশ্চয়তা" },
    original_guarantee_desc_v2: { en: "Guarantee of product purity and originality.", bn: "পণ্যের বিশুদ্ধতা ও অরিজিনাল হওয়ার গ্যারান্টি।" },
    chemical_free_v2: { en: "Chemical-Free Food Manufacturer", bn: "কেমিক্যালমুক্ত খাদ্য প্রস্তুতকারক" },
    chemical_free_desc_v2: { en: "No harmful preservatives or chemicals are used in the food.", bn: "খাবারে কোনো ক্ষতিকর প্রিজারভেটিভ বা কেমিক্যাল ব্যবহার না করা।" },
    bsti_approved: { en: "BSTI Approved Food Products", bn: "BSTI অনুমোদিত খাদ্যপণ্য" },
    bsti_approved_desc: { en: "The products are recognized by the quality control organization BSTI.", bn: "পণ্যগুলো মান নিয়ন্ত্রণকারী সংস্থা BSTI দ্বারা স্বীকৃত।" },

    about_title: { en: "About Us", bn: "আমাদের সম্পর্কে" },
    about_text: { en: "Welcome to Achar Hub Pickle. We bring you the lost tradition of rural Bengal, which makes your everyday simple food royal. Our pickles are made with 100% mustard oil, pure jaggery, and local spices. No chemical preservatives. Being sun-dried, its taste and aroma are unparalleled. Our signature collection includes Mango Series, Garlic Series, and Sour-Spicy-Sweet Fusion.", bn: "Achar Hub Pickle-এ আপনাকে স্বাগতম। আমরা নিয়ে এসেছি গ্রাম-বাংলার সেই হারানো ঐতিহ্য, যা আপনার প্রতিদিনের সাধারণ খাবারকেও করে তুলবে রাজকীয়। আমাদের আচার তৈরিতে ব্যবহৃত হয় শতভাগ সরিষার তেল, খাঁটি গুড় এবং দেশি মসলা। কোনো রাসায়নিক সংরক্ষক নেই। রোদে শুকিয়ে তৈরি করা হয় বলে এর স্বাদ এবং গন্ধ অতুলনীয়। আমাদের সিগনেচার কালেকশনের মধ্যে রয়েছে ম্যাঙ্গো সিরিজ, গার্লিক সিরিজ এবং টক-ঝাল-মিষ্টির ফিউশন।" },
    about_list1: { en: "100% handmade", bn: "১০০% হাতে তৈরি" },
    about_list2: { en: "No formalin", bn: "কোনো ফরমালিন মুক্ত" },
    about_list3: { en: "Home delivery across Bangladesh", bn: "সারা বাংলাদেশে হোম ডেলিভারি" },
    contact_info_title: { en: "Contact Information", bn: "যোগাযোগের তথ্য" },
    contact_info_desc: { en: "Feel free to reach out to us through any of the following methods.", bn: "যেকোনো প্রয়োজনে নিচের মাধ্যমে আমাদের সাথে যোগাযোগ করুন।" },
    address: { en: "Address", bn: "ঠিকানা" },
    address_text: { en: "Charpakundia, Pakundia, Kishoreganj, Dhaka.", bn: "চরপাকুন্দিয়া, পাকুন্দিয়া, কিশোরগঞ্জ, ঢাকা।" },
    contact_title: { en: "Contact Us", bn: "যোগাযোগ করুন" },
    contact_desc: { en: "Call us, email us, or fill out the form below for any needs", bn: "যেকোনো প্রয়োজনে আমাদের কল করুন, ইমেইল করুন অথবা নিচের ফর্মটি পূরণ করুন" },
    phone: { en: "Phone", bn: "ফোন" },
    email: { en: "Email", bn: "ইমেইল" },
    send_message: { en: "Send us a Message", bn: "মেসেজ পাঠান" },
    your_name: { en: "Your Name", bn: "আপনার নাম" },
    your_email: { en: "Your Email", bn: "আপনার ইমেইল" },
    message: { en: "Message", bn: "মেসেজ" },
    send_message_btn: { en: "Send Message", bn: "মেসেজ পাঠান" },
    cart_title: { en: "Your Cart", bn: "আপনার কার্ট" },
    cart_empty: { en: "Cart is empty", bn: "কার্ট খালি" },
    total: { en: "Total:", bn: "মোট:" },
    checkout: { en: "Checkout", bn: "চেকআউট" },
    shipping_info: { en: "Shipping Info", bn: "শিপিং তথ্য" },
    your_name_cart: { en: "Your Name", bn: "আপনার নাম" },
    mobile_number: { en: "Mobile Number", bn: "মোবাইল নম্বর" },
    full_address: { en: "Full Address", bn: "পুরো ঠিকানা" },
    payment_method: { en: "Payment Method", bn: "পেমেন্ট মেথড" },
    cash_on_delivery: { en: "Cash on Delivery", bn: "ক্যাশ অন ডেলিভারি" },
    bkash: { en: "Bkash (Send Money)", bn: "বিকাশ (সেন্ড মানি)" },
    nagad: { en: "Nagad", bn: "নগদ" },
    rocket: { en: "Rocket", bn: "রকেট" },
    transaction_id: { en: "Transaction ID", bn: "ট্রানজেকশন আইডি" },
    place_order: { en: "Place Order", bn: "অর্ডার করুন" },
    go_back: { en: "Go Back", bn: "ফিরে যান" },
    add_to_cart: { en: "Add to Cart", bn: "কার্টে যোগ করুন" },
    buy_now: { en: "Buy Now", bn: "কিনুন" },
    added_to_cart: { en: "added to cart!", bn: "কার্টে যোগ করা হয়েছে!" },
    select_quantity: { en: "Select Quantity", bn: "পরিমাণ নির্বাচন করুন" },
    select_quantity_desc: { en: "How many pieces would you like to add?", bn: "আপনি কতটি যোগ করতে চান?" },
    confirm: { en: "Confirm", bn: "নিশ্চিত করুন" },
    enter_voucher: { en: "Enter Voucher Code", bn: "ভাউচার কোড লিখুন" },
    apply: { en: "Apply", bn: "অ্যাপ্লাই" },
    apply_voucher: { en: "Apply Voucher", bn: "ভাউচার অ্যাপ্লাই করুন" },
    voucher_applied: { en: "Voucher Applied", bn: "ভাউচার যুক্ত হয়েছে" },
    discount: { en: "Discount", bn: "ছাড়" },
    subtotal: { en: "Subtotal", bn: "সাবটোটাল" },
    campaign_offer: { en: "🎉 New Year Offer! Buy any two pickles and get a Tamarind Chutney absolutely free! 🎉", bn: "🎉 নববর্ষ অফার! যেকোনো দুটি আচার কিনুন এবং একটি তেঁতুলের চাটনি সম্পূর্ণ ফ্রি পান! 🎉" },
    customer_reviews: { en: "Customer Reviews", bn: "গ্রাহক রিভিউ" },
    customer_reviews_desc: { en: "See what our customers say about us", bn: "আমাদের সম্পর্কে গ্রাহকরা কী বলছেন দেখুন" },
    delivery_partners_title: { en: "Our Delivery Partners & Merchant Info", bn: "আমাদের ডেলিভারি পার্টনার ও মার্চেন্ট তথ্য" },
    delivery_partners_desc: { en: "We have long-standing experience working with trusted and experienced courier services.", bn: "আমাদের রয়েছে বিশ্বস্ত ও অভিজ্ঞ কুরিয়ার সার্ভিসের সাথে দীর্ঘদিনের কাজের অভিজ্ঞতা।" },
    merchant_id: { en: "Merchant ID", bn: "মার্চেন্ট আইডি" },
    track_order: { en: "Track Order", bn: "অর্ডার ট্র্যাক" }
};

// --- ডামি প্রোডাক্ট ডেটা ---
const products = [
    // Mango Series
    {
        id: 1,
        name: { bn: "টক-ঝাল-মিষ্টি আমের আচার", en: "Sweet-Spicy-Sour Mango Pickle" },
        category: "mixed",
        price: 250,
        originalPrice: 300,
        desc: { bn: "কাঁচা আমের সাথে বিশেষ মশলার সংমিশ্রণে তৈরি টক-ঝাল-মিষ্টি স্বাদের আচার。", en: "A pickle with a sweet, spicy, and sour taste, made with a special mixture of spices with raw mango." },
        image: prod1
    },
    {
        id: 2,
        name: { bn: "আমের কাশ্মীরি আচার (মিষ্টি)", en: "Kashmiri Mango Pickle (Sweet)" },
        category: "mishti",
        price: 350,
        originalPrice: 450,
        desc: { bn: "বাছাই করা আম ও চিনির সিরায় তৈরি ঐতিহ্যবাহী কাশ্মীরি আচার。", en: "Traditional Kashmiri pickle made with selected mangoes and sugar syrup." },
        image: prod2
    },
    {
        id: 3,
        name: { bn: "আমের ঝুরি আচার", en: "Shredded Mango Pickle" },
        category: "tok",
        price: 220,
        originalPrice: 280,
        desc: { bn: "আম কুচি করে রোদে শুকিয়ে তৈরি করা ঝুরি আচার, খিচুড়ির সাথে দারুণ。", en: "Shredded pickle made by sun-drying chopped mangoes, great with khichuri." },
        image: prod3
    },
    {
        id: 4,
        name: { bn: "তেল আম (Traditional)", en: "Oil Mango (Traditional)" },
        category: "tok",
        price: 280,
        originalPrice: 350,
        desc: { bn: "সরিষার তেলে ডুবানো আম, যা সারা বছর সংরক্ষণ করা যায়。", en: "Mango soaked in mustard oil, which can be preserved throughout the year." },
        image: prod4
    },
    // Garlic Series
    {
        id: 5,
        name: { bn: "মধু-রসুনের আচার (Health Special)", en: "Honey-Garlic Pickle (Health Special)" },
        category: "mishti",
        price: 450,
        originalPrice: 550,
        desc: { bn: "খাঁটি মধু ও রসুনের জাদুকরী মিশ্রণ, যা স্বাস্থ্যের জন্য অত্যন্ত উপকারী。", en: "A magical mixture of pure honey and garlic, which is very beneficial for health." },
        image: prod5
    },
    {
        id: 6,
        name: { bn: "ঝাল রসুনের আচার", en: "Spicy Garlic Pickle" },
        category: "jhal",
        price: 300,
        originalPrice: 380,
        desc: { bn: "রসুনের কোয়া ও বিশেষ ঝাল মশলায় তৈরি আচার。", en: "Pickle made with garlic cloves and special hot spices." },
        image: prod6
    },
    {
        id: 7,
        name: { bn: "রসুন-মরিচের আচার", en: "Garlic-Chili Pickle" },
        category: "jhal",
        price: 320,
        originalPrice: 400,
        desc: { bn: "রসুন ও কাঁচা মরিচের ধামাকা কম্বিনেশন。", en: "An explosive combination of garlic and green chilies." },
        image: prod1
    },
    // Sour Series
    {
        id: 8,
        name: { bn: "টক-মিষ্টি-ঝাল বোরই আচার", en: "Sweet-Sour-Spicy Jujube Pickle" },
        category: "mixed",
        price: 200,
        originalPrice: 250,
        desc: { bn: "শুকনো বোরই দিয়ে তৈরি জিভে জল আনা টক-মিষ্টি-ঝাল আচার。", en: "Mouth-watering sweet-sour-spicy pickle made with dried jujubes." },
        image: prod8
    },
    {
        id: 9,
        name: { bn: "তেঁতুলের চাটনি/আচার", en: "Tamarind Chutney/Pickle" },
        category: "tok",
        price: 180,
        originalPrice: 220,
        desc: { bn: "পাকা তেঁতুলের ক্বাথ দিয়ে তৈরি চাটনি, যা সব কিছুর সাথেই মানানসই。", en: "Chutney made from ripe tamarind pulp, which goes well with everything." },
        image: prod2
    },
    {
        id: 10,
        name: { bn: "পাঁচমিশালি ঝাল আচার", en: "Mixed Spicy Pickle" },
        category: "mixed",
        price: 240,
        originalPrice: 300,
        desc: { bn: "বিভিন্ন ফলের মিশ্রণে তৈরি ঝাল ও টক স্বাদের আচার。", en: "A spicy and sour pickle made from a mixture of different fruits." },
        image: prod3
    },
    // Others
    {
        id: 11,
        name: { bn: "জলপাইয়ের আচার (সিজনাল)", en: "Olive Pickle (Seasonal)" },
        category: "tok",
        price: 220,
        originalPrice: 280,
        desc: { bn: "টাটকা জলপাই দিয়ে তৈরি সিজনাল স্পেশাল আচার。", en: "Seasonal special pickle made with fresh olives." },
        image: prod4
    },
    {
        id: 12,
        name: { bn: "চালতার আচার", en: "Elephant Apple Pickle" },
        category: "tok",
        price: 200,
        originalPrice: 250,
        desc: { bn: "চালতার ফালি দিয়ে তৈরি টক-মিষ্টি আচার。", en: "Sweet and sour pickle made with slices of elephant apple." },
        image: prod5
    },
    {
        id: 13,
        name: { bn: "নাগা মরিচের আচার", en: "Naga Chili Pickle" },
        category: "jhal",
        price: 350,
        originalPrice: 450,
        desc: { bn: "অত্যধিক ঝাল প্রেমীদের জন্য নাগা মরিচ বা বোম্বাই মরিচের আচার。", en: "Naga chili or Bombay chili pickle for extreme spice lovers." },
        image: prod6
    }
];

const slides = [
    { img: slide1, alt: "Slide 1" },
    { img: slide2, alt: "Slide 2" },
    { img: slide3, alt: "Slide 3" },
    { img: slide4, alt: "Slide 4" },
    { img: slide5, alt: "Slide 5" },
    { img: slide6, alt: "Slide 6" }
];

const reviews = [
    {
        id: 1,
        name: "Rahim Ahmed",
        rating: 5,
        comment: { en: "The mango pickle is absolutely delicious! Tastes just like homemade.", bn: "আমের আচারটা অসাধারণ! একদম ঘরের তৈরির মতো স্বাদ।" },
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
        id: 2,
        name: "Sumaiya Khan",
        rating: 4,
        comment: { en: "Loved the garlic pickle. Delivery was very fast.", bn: "রসুনের আচারটা খুব ভালো লেগেছে। ডেলিভারিও খুব দ্রুত ছিল।" },
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        id: 3,
        name: "Karim Ullah",
        rating: 5,
        comment: { en: "Best pickle shop in town. Highly recommended!", bn: "শহরের সেরা আচারের দোকান। সবাইকে কেনার পরামর্শ দিচ্ছি!" },
        avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
        id: 4,
        name: "Fatima Begum",
        rating: 5,
        comment: { en: "Authentic flavors! The tamarind chutney is my favorite.", bn: "আসল স্বাদ! তেঁতুলের চাটনি আমার প্রিয়।" },
        avatar: "https://i.pravatar.cc/150?img=7"
    },
    {
        id: 5,
        name: "Mohammed Ali",
        rating: 4,
        comment: { en: "Great quality pickles. Packaging was excellent.", bn: "চমৎকার মানের আচার। প্যাকেজিং ছিল অসাধারণ।" },
        avatar: "https://i.pravatar.cc/150?img=9"
    },
    {
        id: 6,
        name: "Ayesha Rahman",
        rating: 5,
        comment: { en: "Perfect for gifts! Everyone loved the mixed pickle.", bn: "উপহারের জন্য পারফেক্ট! সবাই মিশ্র আচারটা ভালোবেসেছে।" },
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
        id: 7,
        name: "Hassan Chowdhury",
        rating: 5,
        comment: { en: "Traditional taste preserved. Will order again!", bn: "ঐতিহ্যবাহী স্বাদ সংরক্ষিত। আবার অর্ডার করব!" },
        avatar: "https://i.pravatar.cc/150?img=15"
    }
];

// --- Draggable WhatsApp Button Component ---
const DraggableWhatsAppButton = () => {
    const [pos, setPos] = useState(null);
    const ref = useRef(null);
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const initialOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseDown = (e) => {
            if (e.button !== 0) return; // Only left click
            e.preventDefault(); // Prevent default browser drag

            const rect = element.getBoundingClientRect();
            initialOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            dragStart.current = { x: e.clientX, y: e.clientY };
            isDragging.current = false;

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (e) => {
            if (!isDragging.current) {
                const dx = e.clientX - dragStart.current.x;
                const dy = e.clientY - dragStart.current.y;
                if (Math.sqrt(dx * dx + dy * dy) > 5) {
                    isDragging.current = true;
                }
            }

            if (isDragging.current) {
                setPos({
                    left: e.clientX - initialOffset.current.x,
                    top: e.clientY - initialOffset.current.y
                });
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        const handleTouchStart = (e) => {
            const touch = e.touches[0];
            const rect = element.getBoundingClientRect();
            initialOffset.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
            dragStart.current = { x: touch.clientX, y: touch.clientY };
            isDragging.current = false;

            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
        };

        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            if (!isDragging.current) {
                const dx = touch.clientX - dragStart.current.x;
                const dy = touch.clientY - dragStart.current.y;
                if (Math.sqrt(dx * dx + dy * dy) > 5) {
                    isDragging.current = true;
                }
            }

            if (isDragging.current) {
                if (e.cancelable) e.preventDefault(); // Prevent scrolling
                setPos({
                    left: touch.clientX - initialOffset.current.x,
                    top: touch.clientY - initialOffset.current.y
                });
            }
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('touchstart', handleTouchStart, { passive: false });

        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
            element.removeEventListener('touchstart', handleTouchStart);
        };
    }, []);

    const handleClick = (e) => {
        if (isDragging.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const style = pos ? {
        position: 'fixed',
        left: `${pos.left}px`,
        top: `${pos.top}px`,
        bottom: 'auto',
        right: 'auto',
        transform: 'none',
        zIndex: 9999,
        cursor: 'move'
    } : { cursor: 'pointer' };

    return (
        <a
            ref={ref}
            href="https://wa.me/8801757121627"
            target="_blank"
            className="whatsapp-float-btn"
            title="Chat with us on WhatsApp"
            style={style}
            onClick={handleClick}
            draggable="false"
        >
            <i className="fab fa-whatsapp"></i>
        </a>
    );
};

function App() {
    const [lang, setLang] = useState('en');
    const [cart, setCart] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isPaused, setIsPaused] = useState(false);
    const [theme, setTheme] = useState('light');
    const [quantityModal, setQuantityModal] = useState({ open: false, product: null });
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [isVoucherApplied, setIsVoucherApplied] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [activeSection, setActiveSection] = useState('home');

    // Body Scroll Lock when Menu is Open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    // Location State
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedUpazila('');
    };

    // Helper function to get translation
    const t = (key) => {
        if (translations[key] && translations[key][lang]) {
            return translations[key][lang];
        }
        return key;
    };

    // Helper function to convert numbers to Bengali
    const toBengaliNumber = (num) => {
        const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return String(num).replace(/\d/g, d => bengaliDigits[d]);
    };

    // Helper function to format price
    const formatPrice = (price) => {
        const number = lang === 'bn' ? toBengaliNumber(price) : price;
        return `৳ ${number}`;
    };

    // WhatsApp Inquiry Logic
    const handleWhatsAppInquiry = (product) => {
        const productName = product.name[lang];
        const productPrice = formatPrice(product.price);

        let message = "";
        if (lang === 'bn') {
            message = `হাই, আমি এই পণ্যটি কিনতে আগ্রহী:\n\n*${productName}*\nদাম: ${productPrice}\n\nবিস্তারিত জানাবেন?`;
        } else {
            message = `Hi, I am interested in this product:\n\n*${productName}*\nPrice: ${productPrice}\n\nPlease provide more details.`;
        }

        const url = `https://wa.me/8801757121627?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // Theme Toggle Logic
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Countdown Timer Logic for Flash Sale
    useEffect(() => {
        const targetDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 day from now

        const updateCountdown = () => {
            const now = new Date();
            const diff = targetDate - now;

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Slider Logic
    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % slides.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isPaused]);

    // Scroll Detection for Active Section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'products', 'services', 'about', 'contact'];
            const scrollPosition = window.scrollY + 100; // Offset for navbar height

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update document data-section attribute
    useEffect(() => {
        document.documentElement.setAttribute('data-section', activeSection);
    }, [activeSection]);

    // Toast Logic
    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    // Handle Order Submission (Steadfast Integration)
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const district = selectedDistrict;
        const upazila = selectedUpazila;
        const addressDetails = formData.get('address');

        if (!district || !upazila) {
            showToast(lang === 'bn' ? 'অনুগ্রহ করে ঠিকানা সম্পূর্ণ করুন' : 'Please complete the address');
            return;
        }

        const orderData = {
            invoice: `INV-${Date.now()}`,
            recipient_name: formData.get('name'),
            recipient_phone: formData.get('phone'),
            recipient_address: `${addressDetails}, ${upazila}, ${district}`,
            cod_amount: paymentMethod === 'cod' ? totalPrice : 0,
            note: `Payment: ${paymentMethod}. Items: ${cart.map(i => `${i.name.en} x${i.qty}`).join(', ')}`
        };

        // TODO: Replace with your actual Steadfast API keys
        const API_KEY = "YOUR_API_KEY";
        const SECRET_KEY = "YOUR_SECRET_KEY";

        let consignmentId = null;

        try {
            showToast("⏳ Processing order...");

            const response = await fetch('https://portal.steadfast.com.bd/api/v1/create_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': API_KEY,
                    'Secret-Key': SECRET_KEY
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();
            console.log("Steadfast Response:", data);

            if (data && data.consignment && data.consignment.consignment_id) {
                consignmentId = data.consignment.consignment_id;
            }
        } catch (error) {
            console.error("Steadfast API Error:", error);
        }

        // Clear cart and close modal
        setCart([]);
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setIsVoucherApplied(false);
        setSelectedDivision('');
        setSelectedDistrict('');
        setSelectedUpazila('');

        if (consignmentId) {
            showToast(`✅ Order placed! ID: ${consignmentId}`);
            alert(`Order Placed Successfully!\nYour Consignment ID: ${consignmentId}\nPlease save this ID for tracking.`);
        } else {
            showToast("✅ Order placed successfully!");
        }
    };

    // Cart Logic
    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + quantity } : item
                );
            }
            return [...prevCart, { ...product, qty: quantity }];
        });
        showToast(`${product.name[lang]} ${t('added_to_cart')}`);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId) {
                    const newQty = item.qty + delta;
                    return newQty > 0 ? { ...item, qty: newQty } : item;
                }
                return item;
            });
        });
    };

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const subTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discountAmount = isVoucherApplied ? 50 : 0;
    const totalPrice = Math.max(0, subTotal - discountAmount);

    // Filter Logic
    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    const getCategoryName = (cat) => {
        const categoryMap = { 'tok': 'sour', 'mishti': 'sweet', 'jhal': 'spicy', 'mixed': 'mixed' };
        return t(categoryMap[cat] || cat);
    };

    // Quantity Modal Logic
    const openQuantityModal = (product) => {
        setQuantityModal({ open: true, product });
        setSelectedQuantity(1);
    };

    const closeQuantityModal = () => {
        setQuantityModal({ open: false, product: null });
    };

    return (
        <div className="App" id="top">
            {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}

            {/* Header */}
            <header>
                <div className="container navbar">
                    <a href="#" className="logo"><img src={logo} alt="HBC Achar" /></a>

                    {/* Wrapper for Button and Timer */}
                    <div className="flash-sale-wrapper" style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginRight: 'auto', gap: '10px' }}>
                        <button
                            className="flash-sale-nav-btn"
                            onClick={() => { setCurrentPage('flashsale'); window.scrollTo(0, 0); }}
                            style={{
                                background: 'var(--secondary-orange)',
                                color: 'white',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                cursor: 'pointer',
                                zIndex: 101,
                                fontFamily: "'Lobster', cursive",
                                animation: 'btnPulse 2s infinite'
                            }}
                        >
                            <i className="fas fa-bolt"></i> {lang === 'bn' ? 'ফ্ল্যাশ সেল' : 'Flash Sale'}
                        </button>

                        {/* Navbar Countdown Timer */}
                        <div className="nav-timer" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            color: 'var(--secondary-orange)',
                            background: '#fff',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            border: '1px solid var(--secondary-orange)',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            whiteSpace: 'nowrap'
                        }}>
                            <i className="far fa-clock"></i>
                            {timeLeft.days > 0 && (
                                <>
                                    <span>{String(timeLeft.days).padStart(2, '0')}d</span>
                                    <span>:</span>
                                </>
                            )}
                            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
                            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
                            <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
                        </div>
                    </div>

                    <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                    <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <a href="#top" className={activeSection === 'home' ? 'active' : ''} onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>
                            <i className="fas fa-home nav-icon"></i> Home
                        </a>
                        <a href="#products" className={activeSection === 'products' ? 'active' : ''} onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>
                            <i className="fas fa-shopping-basket nav-icon"></i> Our Pickles
                        </a>
                        <a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>
                            <i className="fas fa-concierge-bell nav-icon"></i> Services
                        </a>
                        <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>
                            <i className="fas fa-info-circle nav-icon"></i> About Us
                        </a>
                        <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>
                            <i className="fas fa-envelope nav-icon"></i> Contact
                        </a>
                        <a href="#" onClick={() => { alert(lang === 'bn' ? 'অর্ডার ট্র্যাক শীঘ্রই আসছে!' : 'Track Order coming soon!'); setIsMenuOpen(false); }}>
                            <i className="fas fa-truck nav-icon"></i>
                        </a>
                    </nav>
                    <div className="nav-icons">
                        <div className="cart-btn-wrapper">
                            <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
                                <img src={shoppingBagIcon} alt="Cart" />
                            </button>
                            <span className="cart-count">{totalQty}</span>
                        </div>
                        <div className="user-menu-wrapper">
                            <button className="user-btn">
                                <img src={userIcon} alt="User" />
                            </button>
                            <div className="user-dropdown">
                                <a href="#">Sign In</a>
                                <a href="#">Sign Up</a>
                            </div>
                        </div>
                        <div className="language-selector">
                            <select value={lang} onChange={(e) => setLang(e.target.value)}>
                                <option value="en">English</option>
                                <option value="bn">বাংলা</option>
                            </select>
                        </div>
                        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
                            {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
                        </button>
                        <div className="track-order-btn-wrapper">
                            <button className="track-order-btn" onClick={() => alert(lang === 'bn' ? 'অর্ডার ট্র্যাক শীঘ্রই আসছে!' : 'Track Order coming soon!')} title={t('track_order')}>
                                <i className="fas fa-truck"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Flash Sale Hero */}
            {currentPage === 'home' && (
                <section id="home">
                    <div
                        className="flash-sale-carousel"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        <button className="carousel-btn" id="flash-prev" onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}>❮</button>
                        <div className="flash-sale-slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {slides.map((slide, index) => (
                                <div className="flash-sale-slide" key={index} onClick={() => { setCurrentPage('flashsale'); window.scrollTo(0, 0); }} style={{ cursor: 'pointer' }}>
                                    <div className="product-card">
                                        <div className="product-img">
                                            <img src={slide.img} alt={slide.alt} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-btn" id="flash-next" onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}>❯</button>
                        <div className="carousel-dots">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${currentSlide === index ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                ></button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Flash Sale Section */}
            {currentPage === 'flashsale' && (
                <section id="flashsale" style={{ padding: '40px 0' }}>
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">{lang === 'bn' ? 'ফ্ল্যাশ সেল' : 'Flash Sale'}</h2>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px', fontSize: '1.2rem', fontWeight: 'bold', color: '#D4AF37' }}>
                                <span>{lang === 'bn' ? 'অফার শেষ হবে:' : 'Offer ends in:'}</span>
                                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                    <span style={{ background: '#D4AF37', color: 'white', padding: '5px 10px', borderRadius: '5px', minWidth: '40px', textAlign: 'center' }}>
                                        {String(timeLeft.days).padStart(2, '0')}d
                                    </span> :
                                    <span style={{ background: '#D4AF37', color: 'white', padding: '5px 10px', borderRadius: '5px', minWidth: '40px', textAlign: 'center' }}>
                                        {String(timeLeft.hours).padStart(2, '0')}h
                                    </span> :
                                    <span style={{ background: '#D4AF37', color: 'white', padding: '5px 10px', borderRadius: '5px', minWidth: '40px', textAlign: 'center' }}>
                                        {String(timeLeft.minutes).padStart(2, '0')}m
                                    </span> :
                                    <span style={{ background: '#D4AF37', color: 'white', padding: '5px 10px', borderRadius: '5px', minWidth: '40px', textAlign: 'center' }}>
                                        {String(timeLeft.seconds).padStart(2, '0')}s
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="products-grid">
                            {products.slice(0, 6).map(product => (
                                <div className="product-card" key={`flash-${product.id}`} style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: '#FF5722',
                                        color: 'white',
                                        padding: '5px 10px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        zIndex: 10
                                    }}>
                                        {lang === 'bn' ? 'ফ্ল্যাশ সেল' : 'FLASH SALE'}
                                    </div>
                                    <div className="product-img" style={{ aspectRatio: '1 / 1', width: '100%' }}>
                                        <img src={product.image} alt={product.name[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="product-info" style={{ textAlign: 'center' }}>
                                        <div className="product-footer" style={{ flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                            <div>
                                                {product.originalPrice && (
                                                    <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginRight: '5px' }}>{formatPrice(product.originalPrice)}</span>
                                                )}
                                                <span className="price" style={{ color: '#FF5722', fontWeight: 'bold' }}>{formatPrice(Math.round(product.price * 0.8))}</span>
                                                <span style={{ color: '#FF5722', fontSize: '0.8rem', marginLeft: '5px' }}>
                                                    ({lang === 'bn' ? '২০% ছাড়' : '20% OFF'})
                                                </span>
                                            </div>
                                            <div className="product-actions">
                                                <button className="add-btn" onClick={() => openQuantityModal(product)} title={t('add_to_cart')}>
                                                    <i className="fas fa-cart-plus"></i>
                                                </button>
                                                <button className="buy-now-btn" onClick={() => { addToCart(product); setIsCartOpen(true); setIsCheckoutOpen(true); }}>{t('buy_now')}</button>
                                                <button className="whatsapp-btn-card" onClick={() => handleWhatsAppInquiry(product)} title={lang === 'bn' ? "হোয়াটসঅ্যাপে অর্ডার করুন" : "Order on WhatsApp"}>
                                                    <i className="fab fa-whatsapp"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Selector Overlay (Inside Card) */}
                                    {quantityModal.open && quantityModal.product?.id === product.id && (
                                        <div className="quantity-overlay">
                                            <span className="close-qty-overlay" onClick={(e) => { e.stopPropagation(); closeQuantityModal(); }}>&times;</span>
                                            <h3 style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--secondary-color)', fontSize: '2vh' }}>{t('select_quantity')}</h3>
                                            <div className="quantity-selector-list">
                                                {[1, 2, 3, 4, 5].map(qty => {
                                                    const weight = qty * 400;
                                                    const isKg = weight >= 1000;
                                                    const weightVal = isKg ? weight / 1000 : weight;
                                                    const weightTextBn = `${toBengaliNumber(weightVal)} ${isKg ? 'কেজি' : 'গ্রাম'}`;
                                                    const weightTextEn = `${weightVal}${isKg ? 'kg' : 'g'}`;

                                                    return (
                                                        <button
                                                            key={qty}
                                                            className="qty-list-btn"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                addToCart(product, qty);
                                                                closeQuantityModal();
                                                            }}
                                                        >
                                                            {lang === 'bn' ? `${toBengaliNumber(qty)} পিস (${weightTextBn})` : `${qty} Piece${qty > 1 ? 's' : ''} (${weightTextEn})`}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {currentPage === 'home' && (
                <main>
                    {/* Products Section */}
                    <section id="products">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">{t('popular_pickles')}</h2>
                            </div>

                            <div className="filter-section">
                                {['all', 'tok', 'mishti', 'jhal', 'mixed'].map(cat => (
                                    <button
                                        key={cat}
                                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                        onClick={() => setFilter(cat)}
                                    >
                                        {t(cat === 'tok' ? 'sour' : cat === 'mishti' ? 'sweet' : cat === 'jhal' ? 'spicy' : cat)}
                                    </button>
                                ))}
                            </div>

                            <div className="products-grid">
                                {filteredProducts.map(product => (
                                    <div className="product-card" key={product.id} style={{ position: 'relative' }}>
                                        <div className="product-img" style={{ aspectRatio: '1 / 1', width: '100%' }}>
                                            <img src={product.image} alt={product.name[lang]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div className="product-info" style={{ textAlign: 'center' }}>
                                            <h3 className="product-title">{product.name[lang]}</h3>
                                            <div className="product-footer" style={{ flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%' }}>
                                                    <span className="price">{formatPrice(product.price)}</span>
                                                    <button className="add-btn" onClick={() => openQuantityModal(product)} title={t('add_to_cart')}>
                                                        <i className="fas fa-cart-plus"></i>
                                                    </button>
                                                    <button className="whatsapp-btn-card" onClick={() => handleWhatsAppInquiry(product)} title={lang === 'bn' ? "হোয়াটসঅ্যাপে অর্ডার করুন" : "Order on WhatsApp"}>
                                                        <i className="fab fa-whatsapp"></i>
                                                    </button>
                                                </div>
                                                <div className="product-actions">
                                                    <button className="buy-now-btn" onClick={() => { addToCart(product); setIsCartOpen(true); setIsCheckoutOpen(true); }}>{t('buy_now')}</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity Selector Overlay (Inside Card) */}
                                        {quantityModal.open && quantityModal.product?.id === product.id && (
                                            <div className="quantity-overlay">
                                                <span className="close-qty-overlay" onClick={(e) => { e.stopPropagation(); closeQuantityModal(); }}>&times;</span>
                                                <h3 style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--secondary-color)', fontSize: '2vh' }}>{t('select_quantity')}</h3>
                                                <div className="quantity-selector-list">
                                                    {[1, 2, 3, 4, 5].map(qty => {
                                                        const weight = qty * 400;
                                                        const isKg = weight >= 1000;
                                                        const weightVal = isKg ? weight / 1000 : weight;
                                                        const weightTextBn = `${toBengaliNumber(weightVal)} ${isKg ? 'কেজি' : 'গ্রাম'}`;
                                                        const weightTextEn = `${weightVal}${isKg ? 'kg' : 'g'}`;

                                                        return (
                                                            <button
                                                                key={qty}
                                                                className="qty-list-btn"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    addToCart(product, qty);
                                                                    closeQuantityModal();
                                                                }}
                                                            >
                                                                {lang === 'bn' ? `${toBengaliNumber(qty)} পিস (${weightTextBn})` : `${qty} Piece${qty > 1 ? 's' : ''} (${weightTextEn})`}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Customer Reviews Section */}
                    <section id="reviews" className="reviews-section">
                        <div className="section-header">
                            <h2 className="section-title">{t('customer_reviews')}</h2>
                        </div>
                        <div className="reviews-grid">
                            <div className="reviews-scroll">
                                {reviews.concat(reviews).map((review, index) => (
                                    <div className="review-card" key={`${review.id}-${index}`}>
                                        <div className="review-header">
                                            <img src={review.avatar} alt={review.name} />
                                            <div>
                                                <h4>{review.name}</h4>
                                                <div className="review-stars">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={i < review.rating ? "fas fa-star" : "far fa-star"}></i>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p>"{review.comment[lang]}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Services Section */}
                    <section id="services" className="services-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">{t('services')}</h2>
                            </div>
                            <div className="service-features">
                                {[
                                    { icon: 'headset', title: 'uninterrupted_support_v2', desc: 'uninterrupted_support_desc_v2' },
                                    { icon: 'truck-fast', title: 'fast_delivery_v2', desc: 'fast_delivery_desc_v2' },
                                    { icon: 'shield-alt', title: 'food_safety', desc: 'food_safety_desc' },
                                    { icon: 'leaf', title: 'chemical_free_v2', desc: 'chemical_free_desc_v2' }
                                ].map((service, i) => (
                                    <div className="feature-box" key={i}>
                                        <span className="feature-icon"><i className={`fas fa-${service.icon}`} style={{ fontSize: '2.5rem' }}></i></span>
                                        <h3 style={{ fontSize: '0.9rem', marginBottom: '5px' }}>{t(service.title)}</h3>
                                        <p style={{ fontSize: '0.8rem', lineHeight: '1.3' }}>{t(service.desc)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section id="about" className="about-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">{t('about_title')}</h2>
                            </div>
                            <div className="about-card">
                                <div className="about-image-wrapper">
                                    <img src={coverImage} alt="HBC Achar Shop Banner" />
                                </div>
                                <div className="about-content">
                                    <p className="about-intro">{t('about_text')}</p>
                                    {/* Delivery Partners Section moved inside about-content */}
                                    <div className="delivery-partners-section">
                                        <h3 className="section-title" style={{ fontSize: '3vh', marginTop: '0', marginBottom: '2vh' }}>📦 {t('delivery_partners_title')} 📦</h3>
                                        <p className="delivery-desc">{t('delivery_partners_desc')}</p>
                                        <div className="partners-grid">
                                            {[
                                                { name: 'Steadfast', id: '1192391' },
                                                { name: 'SFC', id: '1603093' },
                                                { name: 'CarryBee', id: '3443' },
                                                { name: 'Pathao Courier', id: '240010' },
                                                { name: 'RDX', id: '3946936' }
                                            ].map((partner, index) => (
                                                <div key={index} className="partner-card">
                                                    <h4>{partner.name}</h4>
                                                    <p>{t('merchant_id')}: <strong>{partner.id}</strong></p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section id="contact" className="contact-section">
                        <div className="container">
                            <div className="section-header">
                                <h2 className="section-title">{t('contact_title')}</h2>
                            </div>
                            <div className="contact-grid">
                                <div className="contact-info-card">
                                    <h1>{t('contact_info_title')}</h1>
                                    <p>{t('contact_info_desc')}</p>
                                    <div className="info-item">
                                        <i className="fas fa-phone"></i>
                                        <div>
                                            <h4>{t('phone')}</h4>
                                            <p>01757-121627</p>
                                        </div>
                                    </div>
                                    <div className="info-item" style={{ cursor: 'pointer' }} onClick={() => window.location = 'mailto:hbcacharshop@gmail.com'}>
                                        <i className="fas fa-envelope"></i>
                                        <div>
                                            <h4>{t('email')}</h4>
                                            <p>hbcacharshop@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <div>
                                            <h4>{t('address')}</h4>
                                            <p>{t('address_text')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-form-card">
                                    <h1>{t('send_message')}</h1>
                                    <form id="contact-form" onSubmit={(e) => { e.preventDefault(); showToast('✅ Message sent successfully!'); e.target.reset(); }}>
                                        <div className="form-group">
                                            <label htmlFor="contact-name">{t('your_name')}</label>
                                            <input type="text" id="contact-name" required placeholder={lang === 'bn' ? 'উদাঃ, রহিম আহমেদ' : 'e.g., Rahim Ahmed'} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="contact-email">{t('your_email')}</label>
                                            <input type="email" id="contact-email" required placeholder={lang === 'bn' ? 'উদাঃ, your.email@example.com' : 'e.g., your.email@example.com'} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="contact-message">{t('message')}</label>
                                            <textarea id="contact-message" rows="4" required placeholder={lang === 'bn' ? 'আপনার জিজ্ঞাসা বা মতামত এখানে লিখুন...' : 'Write your query or feedback here...'}></textarea>
                                        </div>
                                        <button type="submit" className="submit-btn">{t('send_message_btn')}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            )}

            {/* Footer */}
            <footer style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${footerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'var(--footer-bg)'
            }}>
                <div className="container">
                    <div className="footer-grid">
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', flex: '2' }}>
                            <div className="footer-col" style={{ flex: '1 1 200px' }}>
                                <h3>HBC Achar</h3>
                                <p style={{ color: 'white' }}>{t('footer_desc')}</p>
                            </div>
                            <div className="footer-col follow-us-col" style={{ flex: '1 1 150px' }}>
                                <h3>Follow Us</h3>
                                <div className="social-links">
                                    <a href="https://www.facebook.com/groups/512382615075881/" target="_blank" aria-label="Facebook Group" className="facebook">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                            <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
                                            <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v11.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z" />
                                        </svg>
                                    </a>
                                    <a href="#" target="_blank" aria-label="TikTok" className="tiktok">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                            <path fill="#000000" d="M24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,12.955,35.045,4,24,4z" />
                                            <path fill="#FFFFFF" transform="translate(1, 3)" d="M33.3,16.8c-2.4-0.2-4.5-1.4-5.9-3.2v12.7c0,4.6-3.7,8.3-8.3,8.3s-8.3-3.7-8.3-8.3s3.7-8.3,8.3-8.3c0.5,0,1,0.1,1.5,0.2v4.3c-0.5-0.2-0.9-0.2-1.5-0.2c-2.3,0-4.2,1.9-4.2,4.2s1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2V6h4.2c0,3.3,2.1,6.1,5.1,7.4L33.3,16.8z" />
                                        </svg>
                                    </a>
                                    <a href="#" target="_blank" aria-label="Telegram" className="telegram">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                            <path fill="#29b6f6" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M33.95,15.233l-4.584,21.232c-0.242,1.124-0.89,1.403-1.82,0.882l-6.523-4.833l-3.14,3.024 c-0.341,0.341-0.633,0.631-1.217,0.631l0.44-6.611l11.725-10.697c0.516-0.472-0.084-0.729-0.75-0.259L16.92,25.831l-6.37-1.998 c-1.116-0.348-1.125-1.114,0.209-1.653l21.928-8.545C33.261,13.482,34.314,13.9,33.95,15.233z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="footer-col">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#products">Products</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="copyright">
                        &copy; 2026 HBC Achar Shop. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Cart Modal */}
            <div id="cart-modal" className={`modal ${isCartOpen ? 'active' : ''}`} onClick={(e) => { if (e.target.id === 'cart-modal') setIsCartOpen(false); }}>
                <div className="modal-content">
                    <span className="close-modal" onClick={() => setIsCartOpen(false)}>&times;</span>

                    {!isCheckoutOpen ? (
                        <div id="cart-view" className="cart-view">
                            <h2 style={{ marginBottom: '20px', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path>
                                </svg>
                                {t('cart_title')}
                            </h2>
                            <div className="cart-items">
                                {cart.length === 0 ? (
                                    <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>{t('cart_empty')}</p>
                                ) : (
                                    cart.map(item => (
                                        <div className="cart-item" key={item.id}>
                                            <div className="cart-item-left">
                                                <img src={item.image} alt={item.name[lang]} />
                                                <div className="cart-item-details">
                                                    <h4>{item.name[lang]}</h4>
                                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '5px' }}>{formatPrice(item.price)}</p>
                                                    <div className="quantity-control">
                                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                        <span>{item.qty}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cart-item-right">
                                                <strong>{formatPrice(item.price * item.qty)}</strong>
                                                <button className="remove-item" onClick={() => removeFromCart(item.id)}>✕</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="form-group" style={{ marginTop: '20px' }}>
                                <button
                                    onClick={() => {
                                        if (!isVoucherApplied) {
                                            setIsVoucherApplied(true);
                                            showToast(t('voucher_applied'));
                                        }
                                    }}
                                    style={{ width: '100%', padding: '10px', border: 'none', background: isVoucherApplied ? 'var(--success)' : 'var(--secondary-color)', color: 'white', borderRadius: '4px', opacity: isVoucherApplied ? 0.8 : 1, cursor: isVoucherApplied ? 'default' : 'pointer' }}
                                    disabled={isVoucherApplied}
                                >
                                    {isVoucherApplied ? t('voucher_applied') : t('apply_voucher')}
                                </button>
                            </div>

                            <div className="cart-total" style={{ display: 'block' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '1rem', fontWeight: 'normal' }}>
                                    <span>{t('subtotal')}</span>
                                    <span>{formatPrice(subTotal)}</span>
                                </div>
                                {isVoucherApplied && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: 'var(--success)', fontSize: '1rem' }}>
                                        <span>{t('discount')}</span>
                                        <span>- {formatPrice(discountAmount)}</span>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '700', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                                    <span>{t('total')}</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                            </div>
                            {cart.length > 0 && (
                                <button className="submit-btn" onClick={() => setIsCheckoutOpen(true)}>{t('checkout')}</button>
                            )}
                        </div>
                    ) : (
                        <div id="checkout-view" className="checkout-form" style={{ display: 'block' }}>
                            <h2 style={{ marginBottom: '20px', color: 'var(--secondary-color)' }}>📦 {t('shipping_info')}</h2>
                            <form onSubmit={handlePlaceOrder}>
                                <div className="form-group">
                                    <label>{t('your_name_cart')}</label>
                                    <input type="text" name="name" required placeholder={lang === 'bn' ? 'উদাঃ, রহিম আহমেদ' : 'Ex: Rahim Ahmed'} />
                                </div>
                                <div className="form-group">
                                    <label>{t('mobile_number')}</label>
                                    <input type="tel" name="phone" required placeholder="01XXXXXXXXX" pattern="[0-9]{11}" />
                                </div>
                                <div className="form-group">
                                    <label>{lang === 'bn' ? 'জেলা' : 'District'}</label>
                                    <select name="district" value={selectedDistrict} onChange={handleDistrictChange} required>
                                        <option value="">{lang === 'bn' ? 'জেলা নির্বাচন করুন' : 'Select District'}</option>
                                        {sortedDistrictNames.map(dist => (
                                            <option key={dist} value={dist}>{dist}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{lang === 'bn' ? 'থানা/উপজেলা' : 'Thana/Upazila'}</label>
                                    <select name="upazila" value={selectedUpazila} onChange={(e) => setSelectedUpazila(e.target.value)} required disabled={!selectedDistrict}>
                                        <option value="">{lang === 'bn' ? 'থানা নির্বাচন করুন' : 'Select Thana'}</option>
                                        {selectedDistrict && allDistrictsData[selectedDistrict] && allDistrictsData[selectedDistrict].map(upa => (
                                            <option key={upa} value={upa}>{upa}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{t('full_address')}</label>
                                    <textarea name="address" rows="3" required placeholder={lang === 'bn' ? 'বাড়ি নং, রোড নং, এলাকা, জেলা...' : 'House No, Road No, Area, District...'}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>{t('payment_method')}</label>
                                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                        <option value="cod">{t('cash_on_delivery')}</option>
                                        <option value="bkash">{t('bkash')}</option>
                                        <option value="nagad">{t('nagad')}</option>
                                        <option value="rocket">{t('rocket')}</option>
                                    </select>
                                </div>
                                {paymentMethod !== 'cod' && (
                                    <>
                                        <div className="form-group" style={{ background: '#f9f9f9', padding: '10px', borderRadius: '4px', border: '1px dashed #ccc', marginBottom: '15px' }}>
                                            <p style={{ fontSize: '0.9rem', marginBottom: '5px', fontWeight: 'bold' }}>
                                                {lang === 'bn' ? 'নিচের নাম্বারে সেন্ড মানি করুন:' : 'Send Money to this number:'}
                                            </p>
                                            <p style={{ fontSize: '1.1rem', color: 'var(--secondary-color)', fontWeight: 'bold', letterSpacing: '1px' }}>
                                                01757-121627
                                            </p>
                                            <small style={{ color: '#666' }}>
                                                ({paymentMethod === 'bkash' ? 'Bkash' : paymentMethod === 'nagad' ? 'Nagad' : 'Rocket'} Personal)
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <label>{t('transaction_id')}</label>
                                            <input type="text" required placeholder={lang === 'bn' ? 'আপনার ট্রানজেকশন আইডি দিন' : 'Enter your transaction ID'} />
                                        </div>
                                    </>
                                )}
                                <button type="submit" className="submit-btn">{t('place_order')}</button>
                                <button type="button" style={{ width: '100%', marginTop: '10px', background: '#ccc', padding: '10px', border: 'none', borderRadius: '4px' }} onClick={() => setIsCheckoutOpen(false)}>{t('go_back')}</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast */}
            {toast && (
                <div id="toast-container">
                    <div className="toast">{toast}</div>
                </div>
            )}

            {/* Floating WhatsApp Button */}
            <DraggableWhatsAppButton />

            {/* Mobile Bottom Navigation */}
            <div className="mobile-bottom-nav">
                <a className="mobile-nav-btn" href="#" onClick={() => setIsCartOpen(true)}>
                    <img src={shoppingBagIcon} alt="Cart" />
                    {totalQty > 0 && <span className="cart-count-mobile">{totalQty}</span>}
                    <span>{lang === 'bn' ? 'কার্ট' : 'Cart'}</span>
                </a>
                <a className="mobile-nav-btn" href="#" onClick={() => alert(lang === 'bn' ? 'ব্যবহারকারী প্রোফাইল শীঘ্রই আসছে!' : 'User Profile coming soon!')}>
                    <img src={userIcon} alt="User" />
                    <span>{lang === 'bn' ? 'প্রোফাইল' : 'Profile'}</span>
                </a>
                <button className="mobile-nav-btn" onClick={() => alert(lang === 'bn' ? 'অর্ডার ট্র্যাক শীঘ্রই আসছে!' : 'Track Order coming soon!')}>
                    <i className="fas fa-truck"></i>
                </button>
                <button className="mobile-nav-btn" onClick={toggleTheme}>
                    {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
                    <span>{lang === 'bn' ? 'থিম' : 'Theme'}</span>
                </button>
                <button className="mobile-nav-btn" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}>
                    <i className="fas fa-globe"></i>
                    <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
                </button>
            </div>
        </div>
    );
}

export default App;