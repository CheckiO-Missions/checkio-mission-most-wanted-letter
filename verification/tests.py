"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "1. Examples": [
        {
            "input": "Hello World!",
            "answer": 'l'
        },
        {
            "input": "How do you do?",
            "answer": "o"
        },
        {
            "input": "One",
            "answer": "e"
        },
        {
            "input": "Oops!",
            "answer": "o"
        },

    ],
    "2. Basics": [
        {"input": "Lorem ipsum dolor sit amet",
         "answer": "m"},
        {"input": "Aaaaaaaaaaaaaaaa!!!!",
         "answer": "a"},
        {"input": "Gregor then turned to look out the window at the dull weather.Nooooooooooo!!! Why!?!",
         "answer": "o"},
        {"input": "fn;lsfndasl;f naslkdnlkasdnfslahwemwjkrjkl;zcmk;lzcdkcslksdkseewme,",
         "answer": "k"},
    ],
    "3. Texts.": [
        {
            "input": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
            "answer": "e"
        },
        {
            "input": "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.",
            "answer": "e"
        },
        {
            "input": "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz.",
            "answer": "i"
        },
    ]
}
