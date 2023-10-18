import { Message } from 'discord.js';

// Define a list of greetings in different languages
const greetings: { [key: string]: string } = {
    english: 'Hi',
    spanish: 'Hola (OH-la)',
    italian: 'Ciao (chow)',
    japanese: 'こんにちは (kohn-nee-chee-wah)',
    russian: 'Привет (pree-VYET)',
    french: 'Salut (sah-LOO)',
    portugese: 'Oi (oh-ee)',
    mandarin: '你好 (NEE-haow)',
    swahili: 'Hujambo (hoo-JAHM-bo)',
    armenian: 'Բարեւ (bah-REV)',
    kinyarwanda: 'Muraho (moo-RAH-ho)',
    korean: '안녕하세요 (AHN-young-ha-say-yo)',
    thai: 'สวัสดี (sah-WAH-dee)',
    tagalog: 'Kamusta (kah-MOOS-tah)',
    swedish: 'Hej (hey)',
    german: 'Hallo (HAH-lo)',
    pidgin: 'How far (how far)',
    arabic: 'مرحبا (mar-HA-bah)',
    persian: 'سلام (sah-LAHM)',
    hindi: 'नमस्ते (nuhm-uh-stay)',
    urdu: 'ہیلو (hello)',
    oldeenglish: 'Hāl (hail)',
    piglatin: 'Ihay (eye-hay)',
    karen: 'မင်္ဂလာပါ (mangala pa)',
    dothraki: 'M athchomaroon (em ath-cho-ma-roon)',
    klingon: 'nuqneH (nook-neh)',
    elvish: 'Mae govannen (may go-van-nen)',
    vietnamese: 'Chào bạn (chow ban)',
    basque: 'Kaixo (kai-sho)',
};

// Define the command
const hiCommand = {
    name: 'hi',
    description: 'Say hi in a random language',
    execute: (message: Message) => {
        // Get a random greeting
        const languages = Object.keys(greetings);
        const randomLanguage =
            languages[Math.floor(Math.random() * languages.length)];
        const greeting = greetings[randomLanguage];

        // Send the greeting
        message.channel.send(`${randomLanguage} : ${greeting}!`);
    },
};

export default hiCommand;
