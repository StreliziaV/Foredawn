// Global variables
// each element in scenes represents a scene in the game, which can be a conversation or a minigame
/* heading: name of location
   scene: background image
   name: name of speaker
   text: words of speaker
   choices: what I (the player) can respond
*/
var scenes = [{
    heading: 'Demo 0',
    scene: 'Background',
    name: 'Narrator',
    text: 'The world...',
    choices: undefined
},
{
    heading: 'Demo 1',
    scene: 'Background',
    name: 'Narrator',
    text: 'is broken now.',
    choices: undefined
},
{
    heading: 'Demo 2',
    scene: 'Background',
    name: 'Narrator',
    text: '...',
    choices: undefined
},
{
    heading: 'Demo 3',
    scene: 'Background',
    name: 'Narrator',
    text: 'What more can I say? The inception was a small local war.',
    choices: undefined
},
{
    heading: 'Demo 4',
    scene: 'Background',
    name: 'Narrator',
    text: 'Then fires, bombs, viruses, and of course, bodies, non-walking and walking ones.',
    choices: undefined
},
{
    heading: 'Demo 5',
    scene: 'Background',
    name: 'Narrator',
    text: 'The walking bodies, or zombies, have dominated most of the planet, known as the wasteland. The remaining army built several fortresses around the world. The fortress, also known as the safe zone (SZ), is controlled by the military.',
    choices: undefined
},
{
    heading: 'Demo 6',
    scene: 'About you',
    name: 'Narrator',
    text: 'Since there are still survivors outside the fortresses, the military government regularly send a search party by plane.',
    choices: undefined
},
{
    heading: 'Demo 7',
    scene: 'About you',
    name: 'Narrator',
    text: 'You are a recruit of the third search party also known as "Team Hacker" led by Captain Hacker. Your name is...',
    choices: undefined
},
{
    heading: 'Demo 8',
    scene: 'About you',
    name: 'Game',
    text: 'Your Name',
    choices: undefined
},
{
    heading: 'Demo 9',
    scene: 'Inside plane',
    name: 'Narrator',
    text: 'You are now in a transport plane with your teammates. Your mission is to search for survivors on wasteland.',
    choices: undefined
},
{
    heading: 'Demo 10',
    scene: 'Inside plane',
    name: 'Captain',
    text: 'Wake up, girls. Squad B, hold the ground. Squad A and squad C, follow me, enter this building. Find the living, shoot the dead!',
    choices: undefined
},
{
    heading: 'Demo 11',
    scene: 'Entry',
    name: 'Captain',
    text: ['And you, ', me, ', stay close. Now move!'],
    choices: undefined
},
{
    heading: 'Demo 12',
    scene: 'Entry',
    name: 'Members',
    text: 'Yes, Sir!',
    choices: undefined
},
{
    heading: 'Demo 13',
    scene: 'Entry',
    name: 'Hermes',
    text: 'Hello, rookie. You don\'t know we once lost half the people in Atlantic City, do you?',
    choices: undefined
},
{
    heading: 'Demo 14',
    scene: 'Entry',
    name: 'Hermes',
    text: 'Once those roaring monsters run to you, you are gonna piss your pants. Wanna bet on that?',
    choices: undefined
},
{
    heading: 'Demo 15',
    scene: 'Inside',
    name: 'Frank',
    text: 'Concentrate! And Shut the fuck up, Hermes. Everyone knows you were the pants pisser in Team Hacker.',
    choices: ['That\'s alright. We all know Hermes is a kid', 'Thanks, Frank']
},
{
    heading: 'Demo 16',
    scene: 'Inside',
    name: 'Hermes',
    text: 'Hey, we talked about this!',
    choices: undefined
},
{
    heading: 'Demo 17',
    scene: 'Inside',
    name: 'Narrator',
    text: 'Suddenly, something came out of the shadows. You know that\'s not a human.',
    choices: ['Got a situation here', 'Oh my god, a zombie, help!']
},
{
    heading: 'Demo 18',
    scene: 'A zombie',
    name: 'Zombie',
    text: '(Roaring...)',
    choices: undefined
},
{
    heading: 'Demo 19',
    scene: 'A zombie',
    name: 'Captain',
    text: 'Calm down and open fire!',
    choices: undefined
},
{
    heading: 'Demo 20',
    scene: 'A zombie',
    name: 'Sarah',
    text: 'Got it, boss.',
    choices: undefined
},
{
    heading: 'Demo 21',
    scene: 'Before finding',
    name: 'Captain',
    text: 'Well done, Sarah. Everyone stays close. There should be more.',
    choices: undefined
},
{
    heading: 'Demo 22',
    scene: 'Before finding',
    name: 'Hermes',
    text: 'Guys, I heard something.',
    choices: undefined
},
{
    heading: 'Demo 23',
    scene: 'Before finding',
    name: 'Narrator',
    text: 'Everyone held their breath immediately. But there\'s only silence. About ten seconds later, they all heard it.',
    choices: undefined
},
{
    heading: 'Demo 24',
    scene: 'Before finding',
    name: 'Hermes',
    text: 'The corner!',
    choices: undefined
},
{
    heading: 'Demo 25',
    scene: 'Before finding',
    name: 'Sarah',
    text: 'Ready to shoot.',
    choices: ['...', 'I\'m ready, too!']
},
{
    heading: 'Demo 26',
    scene: 'Before finding',
    name: 'Captain',
    text: 'Hold on, Sarah!',
    choices: undefined
},
{
    heading: 'Demo 27',
    scene: 'Before finding',
    name: 'Captain',
    text: ['Hold on, Sarah and ', me, '!'],
    choices: undefined
},
{
    heading: 'Demo 28',
    scene: 'Find them',
    name: 'Survivor',
    text: 'Don\'t shoot! We are not them!',
    choices: undefined
},
{
    heading: 'Demo 29',
    scene: 'Find them',
    name: 'Captain',
    text: 'You\'re safe now, lady. What\'s your name?',
    choices: undefined
},
{
    heading: 'Demo 30',
    scene: 'Find them',
    name: 'Violet',
    text: 'My name is Violet, sir.',
    choices: undefined
},
{
    heading: 'Demo 31',
    scene: 'Find them',
    name: 'Captain',
    text: 'Violet, you know how many lives are in this building?',
    choices: undefined
},
{
    heading: 'Demo 32',
    scene: 'Find them',
    name: 'Violet',
    text: 'It\'s all here, sir. We are a family, and we\'ve hidden here for six monthes. The one, the one you just killed (sobbing), he was my brother. The food run out, so he went out... and got bitten.',
    choices: undefined
},
{
    heading: 'Demo 33',
    scene: 'Find them',
    name: 'Captain',
    text: 'I\'m sorry to hear that. You\'re bleeding. Alexa, bind her wounds.',
    choices: undefined
},
{
    heading: 'Demo 34',
    scene: 'Find them',
    name: 'Alexa',
    text: 'But sir...',
    choices: undefined
},
{
    heading: 'Demo 35',
    scene: 'Find them',
    name: 'Captain',
    text: 'We still have some sedatives. Just do what I said.',
    choices: undefined
},
{
    heading: 'Demo 36',
    scene: 'Find them',
    name: 'Narrator',
    text: '現在公開可能な情報<br>The sedative are useful when people are about to turn into zombies, for an easier execution.',
    choices: undefined
},
{
    heading: 'Demo 37',
    scene: 'Find him',
    name: 'Narrator',
    text: 'Another half an hour later...',
    choices: undefined
},
{
    heading: 'Demo 38',
    scene: 'Find him',
    name: 'Captain',
    text: 'Alright, everyone. Prepare to leave.',
    choices: undefined
},
{
    heading: 'Demo 39',
    scene: 'Find him',
    name: 'Narrator',
    text: 'At one moment, you\'re pretty sure that there was someone hiding in the shadow. You could feel his/her/its tension.',
    choices: ['Who\'s there?', '(Just ignore it and leave)']
},
{
    heading: 'Demo 40',
    scene: 'Find him',
    name: 'Stranger',
    text: '...',
    choices: ['Who are you?', 'What are you?']
},
{
    heading: 'Demo 41',
    scene: 'Find him',
    name: 'Narrator',
    text: 'The stranger walked slowly out of the shadow. Now you saw his face, yes, HIS face. He got badly wounded. And He\'s a freak, a kind of people whose genes\'ve got mutated because of nuclear pollution. They\'re ugly, feeble, and miserable. You rarely saw them in the safe zone.',
    choices: ['You good?']
},
{
    heading: 'Demo 42',
    scene: 'Find him',
    name: 'Freak',
    text: '...',
    choices: ['...', 'We are here to help', 'Can you hear me? I\'m talking to you!']
},
{
    heading: 'Demo 43',
    scene: 'Find him',
    name: 'Freak',
    text: '...',
    choices: ['Don\'t be afraid. I can help you', 'Can\'t you say something?!']
},
{
    heading: 'Demo 44',
    scene: 'Find him',
    name: 'Freak',
    text: '...',
    choices: ['God damn it! Cap, got a situation here', 'Are you fucking deaf?']
},
{
    heading: 'Demo 45',
    scene: 'Find him',
    name: 'Freak',
    text: '...',
    choices: ['Go to hell (shoot him)', '(Leave him alone)']
},
{
    heading: 'Demo 46',
    scene: 'Find him',
    name: 'Narrator',
    text: 'You shot. He died.',
    choices: ['(Frisk him)', '(Leave)']
},
{
    heading: 'Demo 47',
    scene: 'Find him',
    name: 'Narrator',
    text: 'You found a ring.',
    choices: ['(Take it and leave)']
},
{
    heading: 'Demo 48',
    scene: 'Back to team',
    name: 'Captain',
    text: [me, ', what took you so long?'],
    choices: ['Nothing, sir']
},
{
    heading: 'Demo 49',
    scene: 'Back to team',
    name: 'Captain',
    text: [me, ', you shot? What happened?'],
    choices: ['It\'s a zombie, sir']
},
{
    heading: 'Demo 50',
    scene: 'Back to team',
    name: 'Captain',
    text: 'Watch yourself. Board the plane. We go home.',
    choices: ['Yes, sir']
},
{
    heading: 'Demo 51',
    scene: 'Find him',
    name: 'Freak',
    text: 'Get me... out of here, please...',
    choices: ['Let\'s go (carry him)']
},
{
    heading: 'Demo 52',
    scene: 'Find him',
    name: 'Narrator',
    text: 'He trembled, staring at you with frightened eyes. Then he ran away.',
    choices: ['What the hell? (Leave)']
},
{
    heading: 'Demo 53',
    scene: 'Find him',
    name: 'Freak',
    text: 'Take... this. Take this ring... as a pledge of... friendship.',
    choices: ['Oh, how can I... Thank you (Take the ring)']
},
{
    heading: 'Demo 54',
    scene: 'Back to team',
    name: 'Captain',
    text: [me, ', where have you... Gosh... Alexa, give ', me, ' a hand!'],
    choices: undefined
},
{
    heading: 'Demo 55',
    scene: 'Back to team',
    name: 'Captain',
    text: 'Everyone, board the plane. We are going home.',
    choices: undefined
},
{
    heading: 'Demo 56',
    scene: 'Inside plane',
    name: 'Frank',
    text: 'Cap, the sky, look outside!',
    choices: undefined
},
{
    heading: 'Demo 57',
    scene: 'Flying monster',
    name: 'Narrator',
    text: 'People looked out of the window. To everyone\'s surprise, they saw a huge monster flying near the plane.',
    choices: undefined
},
{
    heading: 'Demo 58',
    scene: 'Flying monster',
    name: 'Hermes',
    text: 'We can outrun it, can\'t we?',
    choices: undefined
},
{
    heading: 'Demo 59',
    scene: 'Flying monster',
    name: 'Captain',
    text: 'Speed up!',
    choices: undefined
},
{
    heading: 'Demo 60',
    scene: 'Flying monster',
    name: 'Narrator',
    text: '現在公開可能な情報<br>Escape from the monster! Guide your plane to avoid obstacles by clicking your mouse. You can\'t die in here, can you?',
    choices: undefined
},
{
    heading: 'Demo 61',
    scene: 'Flying monster',
    name: 'Game',
    text: 'Fly Bird',
    choices: undefined
},
{
    heading: 'Demo 62',
    scene: 'Back to SZ',
    name: 'Narrator',
    text: 'You successfully returned to the safe zone.',
    choices: undefined
},
{
    heading: 'Demo 63',
    scene: 'About you',
    name: 'Narrator',
    text: 'One week later, Team Hacker started to carry out a new task that is to search for supplies on wasteland.',
    choices: undefined
},
{
    heading: 'Demo 64',
    scene: 'In street',
    name: 'Captain',
    text: 'Alright, we will search for supplies in this area. Squad A, search in the street. Squad B, you search the left building. Squad C, the right one. Report any emergency you encounter. Take care. Clear?',
    choices: undefined
},
{
    heading: 'Demo 65',
    scene: 'In street',
    name: 'Members',
    text: 'Yes, sir!',
    choices: undefined
},
{
    heading: 'Demo 66',
    scene: 'In building',
    name: 'Hermes',
    text: 'Hey, fish, where you lived before all these?',
    choices: ['...', 'Not in the U.S.', 'Focus on your work, ok?']
},
{
    heading: 'Demo 67',
    scene: 'In building',
    name: 'Hermes',
    text: 'You don\'t want to talk. Well, that\'s fine, but you know what, when the war begun, I was in Vancouver, with my wife. She is, uh, she was a teacher, so was I. We taught pupils in a school, well, she taught Music. When the missiles came, she was playing the piano, and that\'s where she...',
    choices: undefined
},
{
    heading: 'Demo 68',
    scene: 'In building',
    name: 'Hermes',
    text: 'Wow, me too. When the war begun, I was in Vancouver, with my wife. She is, uh, she was a teacher, so was I. We taught pupils in a school, well, she taught Music. When the missiles came, she was playing the piano, and that\'s where she...',
    choices: undefined
},
{
    heading: 'Demo 69',
    scene: 'In building',
    name: 'Hermes',
    text: 'Alright, alright.',
    choices: undefined
},
{
    heading: 'Demo 70',
    scene: 'In building',
    name: 'Sarah',
    text: 'Shit, there are so many!',
    choices: undefined
},
{
    heading: 'Demo 71',
    scene: 'Too many',
    name: 'Narrator',
    text: 'You looked ahead. What you saw shocked everyone in the squad.',
    choices: ['Fuck!']
},
{
    heading: 'Demo 72',
    scene: 'Too many',
    name: 'Frank',
    text: 'Cap, dozens of Z in here! May we leave?',
    choices: undefined
},
{
    heading: 'Demo 73',
    scene: 'Too many',
    name: 'Captain',
    text: 'Yes, you hold on! Squad A and Squad B, stop your work right away, go to rescue Squad C!',
    choices: undefined
},
{
    heading: 'Demo 74',
    scene: 'Too many',
    name: 'Narrator',
    text: 'Zombies were too many and too strong. Your squad suffered a great loss. Teammates lost each other and many of them couldn\'t make it.',
    choices: undefined
},
{
    heading: 'Demo 75',
    scene: 'With Hermes',
    name: 'Narrator',
    text: 'You were with Hermes. He got wounded and was bleeding heavily.',
    choices: undefined
},
{
    heading: 'Demo 76',
    scene: 'With Hermes',
    name: 'Hermes',
    text: 'Seems like you are not a rookie, I am.',
    choices: ['Stop talking! I will find some medical tools for you', 'I\'m sorry, Hermes (Leave him)']
},
{
    heading: 'Demo 77',
    scene: 'Save Hermes',
    name: 'Narrator',
    text: '現在公開可能な情報<br>Transport medical tools to Hermes. Monster are chasing you! Move yourself by "↑ ↓ ← →". You can\'t die in here, can you?',
    choices: undefined
},
{
    heading: 'Demo 78',
    scene: 'Save Hermes',
    name: 'Game',
    text: 'Treasure Hunter',
    choices: undefined
},
{
    heading: 'Demo 79',
    scene: 'With Hermes',
    name: 'Hermes',
    text: '...',
    choices: ['Hermes, I\'m back!']
},
{
    heading: 'Demo 80',
    scene: 'With Hermes',
    name: 'Hermes',
    text: '...',
    choices: ['Hermes, Hermes! Buddy, how are you doing?']
},
{
    heading: 'Demo 81',
    scene: 'With Hermes',
    name: 'Narrator',
    text: 'He\'s gone.',
    choices: ['Oh, god...']
},
{
    heading: 'Demo 82',
    scene: 'You',
    name: 'Narrator',
    text: 'You stood beside him. Your mind went blank.',
    choices: ['... (Leave)']
},
{
    heading: 'Demo 83',
    scene: 'Inside',
    name: 'Narrator',
    text: 'You tried to escape from those zombies and came to a safe place alone. But you lost your intercom and ran out of bullets. You had no idea where others were. You were very exhausted and, of course, scared.',
    choices: ['I can\'t go any further', 'Am I gonna die here?']
},
{
    heading: 'Demo 84',
    scene: 'Near the end',
    name: 'Narrator',
    text: 'You heard someone come to you, so you tried to see his face.',
    choices: undefined
},
{
    heading: 'Demo 85',
    scene: 'Very near the end',
    name: 'Narrator',
    text: 'You saw his face. He\'s a freak. And he\'s not alone.',
    choices: ['Help...']
},
{
    heading: 'Demo 86',
    scene: 'Very near the end',
    name: 'Narrator',
    text: 'They robbed you...',
    choices: undefined
},
{
    heading: 'Demo 87',
    scene: 'Very near the end',
    name: 'Narrator',
    text: 'and then left you alone.',
    choices: ['Don\'t go, please...']
},
{
    heading: 'Demo 88',
    scene: 'Very near the end',
    name: 'Narrator',
    text: 'They found the ring.',
    choices: undefined
},
{
    heading: 'Demo 89',
    scene: 'Very near the end',
    name: 'Lead Freak',
    text: 'How did you get this?',
    choices: ['I saved a person... He\'s like you. He gave me it', 'I found it from a dead freak. I killed him']
},
{
    heading: 'Demo 90',
    scene: 'Very near the end',
    name: 'Lead Freak',
    text: '...',
    choices: ['Help me, please...']
},
{
    heading: 'Demo 91',
    scene: 'Very near the end',
    name: 'Lead Freak',
    text: 'Take him to the camp. We have more questions for him. (The End)',
    choices: undefined
},
{
    heading: 'Demo 92',
    scene: 'Too many',
    name: 'Narrator',
    text: 'You were robbed and left alone. Soon zombies found you. Screams were given, from both them and you. (The End)',
    choices: undefined
},
{
    heading: 'Demo 93',
    scene: 'Very near the end',
    name: 'Lead Freak',
    text: 'He\'s one of us.',
    choices: ['Oh, shit']
},
{
    heading: 'Demo 94',
    scene: 'Very near the end',
    name: 'Narrator',
    text: 'They killed you, brutally. (The End)',
    choices: undefined
}];

// dic denotes the image of characters
var dic = {
    'Narrator': 'img/Narrator.png',
    'Captain': 'img/Captain.png',
    'Members': 'img/Members.png',
    'Frank': 'img/Frank.jpg',
    'Hermes': 'img/Hermes.jpg',
    'Sarah': 'img/Sarah.png',
    'Zombie': 'img/Zombie.jpg',
    'Survivor': 'img/Survivor.jpg',
    'Violet': 'img/Survivor.jpg',
    'Alexa': 'img/Alexa.png',
    'Stranger': 'img/Stranger.png',
    'Freak': 'img/Freak.png',
    'Lead Freak': 'img/Lead_Freak.png'
}
// dic2 denotes the image of background
var dic2 = {
    'Background': 'img/Background.jpg',
    'About you': 'img/About_you.jpg',
    'Inside plane': 'img/Inside_plane.jpg',
    'Entry': 'img/Entry.jpg',
    'Inside': 'img/Inside.jpg',
    'A zombie': 'img/A_zombie.jpg',
    'Before finding': 'img/Before_finding.jpg',
    'Find them': 'img/Find_them.jpg',
    'Find him': 'img/Find_him.jpg',
    'Back to team': 'img/Back_to_team.jpg',
    'Flying monster': 'img/Flying_monster.jpg',
    'Back to SZ': 'img/Background.jpg',
    'In street': 'img/Back_to_team.jpg',
    'In building': 'img/Find_him.jpg',
    'Too many': 'img/Too_many.jpg',
    'With Hermes': 'img/With_Hermes.jpg',
    'Save Hermes': 'img/Too_many.jpg',
    'You': 'img/You.jpg',
    'Near the end': 'img/Near_the_end.jpg',
    'Very near the end': 'img/Very_near_the_end.jpg',
}

/* The ith scene will jump to the graph[i]th scene
   If graph[i] is an array, it means the ith scene has choices,
   and different choice will lead to different scenes
*/
var graph = [
    1, // 0
    2, // 1
    3, // 2
    4,
    5,
    6, // 5
    7,
    8,
    9,
    10,
    11, // 10
    12,
    13,
    14,
    15, 
    [16, 16], // 15
    17, 
    [18, 18],
    19,
    20,
    21, // 20
    22,
    23,
    24,
    25, 
    [26, 27], // 25
    28,
    28,
    29,
    30,
    31, // 30
    32,
    33,
    34,
    35,
    36, // 35
    37,
    38,
    39, 
    [40, 48],
    [41, 41], // 40
    [42],
    [43, 43, 44],
    [51, 44],
    [52, 45],
    [46, 48], // 45
    [47, 48],
    [49],
    [50],
    [50],
    [62], // 50
    [53],
    [48],
    [54],
    55,
    56, // 55
    57,
    58,
    59,
    60,
    61, // 60
    62,
    63,
    64,
    65,
    66, // 65
    [67, 68, 69],
    70,
    70,
    70,
    71, // 70
    [72],
    73,
    74,
    75,
    76, // 75
    [77, 83],
    78,
    79, 
    [80],
    [81], // 80
    [82],
    [83],
    [84, 84],
    85, 
    [86], // 85
    undefined, // 86 has ring or not?
    [92],
    89, 
    [90, 93],
    [91], // 90
    'Ending', // 91 ending 1
    'Ending', // 92 ending 2
    [94],
    'Ending', // 94 ending 3
]
