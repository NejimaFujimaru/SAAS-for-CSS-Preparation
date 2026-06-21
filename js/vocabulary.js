/**
 * Vocabulary Module
 * Advanced word extraction and intelligence system for CSS preparation
 */

const Vocabulary = {
    // Common advanced vocabulary with CSS relevance
    wordDatabase: {
        'accommodate': { pos: 'verb', meaning: 'to provide space or lodging; to adjust', urdu: 'جگہ دینا، مطابقت کرنا', synonyms: ['adapt', 'adjust', 'fit'], antonyms: ['oppose', 'resist'] },
        'accountability': { pos: 'noun', meaning: 'the fact of being responsible for decisions', urdu: 'جوابدہی', synonyms: ['responsibility', 'liability'], antonyms: ['irresponsibility'] },
        'acumen': { pos: 'noun', meaning: 'keen insight and sharp judgment', urdu: 'تیز فہمی، ذہانت', synonyms: ['insight', 'perception', 'wisdom'], antonyms: ['ignorance', 'stupidity'] },
        'advocate': { pos: 'verb', meaning: 'to publicly recommend or support', urdu: 'حمایت کرنا، وکالت کرنا', synonyms: ['support', 'promote', 'champion'], antonyms: ['oppose', 'reject'] },
        'aesthetic': { pos: 'adjective', meaning: 'concerned with beauty or appreciation of beauty', urdu: 'جمالیاتی', synonyms: ['artistic', 'beautiful'], antonyms: ['unaesthetic'] },
        'alleviate': { pos: 'verb', meaning: 'to make suffering less severe', urdu: 'کم کرنا، تخفیف کرنا', synonyms: ['reduce', 'ease', 'relieve'], antonyms: ['worsen', 'aggravate'] },
        'ambiguous': { pos: 'adjective', meaning: 'open to more than one interpretation', urdu: 'مبہم', synonyms: ['unclear', 'vague'], antonyms: ['clear', 'definite'] },
        'ameliorate': { pos: 'verb', meaning: 'to make something bad better', urdu: 'بہتر بنانا', synonyms: ['improve', 'enhance'], antonyms: ['worsen', 'deteriorate'] },
        'anomaly': { pos: 'noun', meaning: 'something that deviates from the norm', urdu: 'غیر معمولی بات', synonyms: ['abnormality', 'irregularity'], antonyms: ['normality'] },
        'anticipate': { pos: 'verb', meaning: 'to expect or predict', urdu: 'متوقع ہونا', synonyms: ['expect', 'await', 'predict'], antonyms: ['ignore'] },
        'apprehension': { pos: 'noun', meaning: 'anxiety or fear about the future', urdu: 'خوف، تشویش', synonyms: ['fear', 'anxiety', 'dread'], antonyms: ['confidence', 'assurance'] },
        'arbitrary': { pos: 'adjective', meaning: 'based on random choice rather than reason', urdu: 'من مانا', synonyms: ['random', 'capricious'], antonyms: ['rational', 'systematic'] },
        'articulate': { pos: 'adjective', meaning: 'having the ability to speak fluently', urdu: 'خوبصورت گفتگو کرنے والا', synonyms: ['eloquent', 'fluent'], antonyms: ['inarticulate'] },
        'assumption': { pos: 'noun', meaning: 'a thing accepted as true without proof', urdu: 'فرض', synonyms: ['presumption', 'supposition'], antonyms: ['fact', 'certainty'] },
        'authentic': { pos: 'adjective', meaning: 'of undisputed origin; genuine', urdu: 'اصلی، مستند', synonyms: ['genuine', 'real'], antonyms: ['fake', 'counterfeit'] },
        'bureaucracy': { pos: 'noun', meaning: 'a system of government with many departments', urdu: 'بیوروکریسی', synonyms: ['administration', 'government'], antonyms: [] },
        'capacity': { pos: 'noun', meaning: 'the maximum amount that something can contain', urdu: 'گنجائش، صلاحیت', synonyms: ['capability', 'ability'], antonyms: ['incapacity'] },
        'catalyst': { pos: 'noun', meaning: 'something that causes activity between two substances', urdu: 'محرک', synonyms: ['stimulus', 'trigger'], antonyms: ['inhibitor'] },
        'coherent': { pos: 'adjective', meaning: 'logical and consistent', urdu: 'منطقی', synonyms: ['consistent', 'logical'], antonyms: ['incoherent'] },
        'collaboration': { pos: 'noun', meaning: 'the action of working together', urdu: 'تعاون', synonyms: ['cooperation', 'partnership'], antonyms: ['competition'] },
        'commence': { pos: 'verb', meaning: 'to begin or start', urdu: 'شروع کرنا', synonyms: ['begin', 'start', 'initiate'], antonyms: ['end', 'conclude'] },
        'comprehensive': { pos: 'adjective', meaning: 'complete and including everything', urdu: 'جامع', synonyms: ['complete', 'thorough'], antonyms: ['partial', 'limited'] },
        'concurrence': { pos: 'noun', meaning: 'agreement or approval', urdu: 'اتفاق', synonyms: ['agreement', 'consent'], antonyms: ['disagreement'] },
        'condone': { pos: 'verb', meaning: 'to accept or allow behavior that is considered wrong', urdu: 'نظر انداز کرنا', synonyms: ['overlook', 'forgive'], antonyms: ['condemn', 'punish'] },
        'conducive': { pos: 'adjective', meaning: 'making a certain situation likely', urdu: 'موثر', synonyms: ['favorable', 'helpful'], antonyms: ['unfavorable'] },
        'consequence': { pos: 'noun', meaning: 'a result or effect of an action', urdu: 'نتیجہ', synonyms: ['result', 'outcome'], antonyms: ['cause'] },
        'conservative': { pos: 'adjective', meaning: 'averse to change or innovation', urdu: 'روایتی پسند', synonyms: ['traditional', 'conventional'], antonyms: ['liberal', 'progressive'] },
        'contemplate': { pos: 'verb', meaning: 'to think deeply about something', urdu: 'غور کرنا', synonyms: ['consider', 'ponder'], antonyms: ['ignore'] },
        'contentious': { pos: 'adjective', meaning: 'causing or likely to cause disagreement', urdu: 'تنازعہ کا باعث', synonyms: ['controversial', 'disputed'], antonyms: ['uncontroversial'] },
        'corroborate': { pos: 'verb', meaning: 'to confirm or give support to', urdu: 'تصدیق کرنا', synonyms: ['confirm', 'verify'], antonyms: ['contradict'] },
        'credibility': { pos: 'noun', meaning: 'the quality of being trusted and believed in', urdu: 'ساکھ', synonyms: ['trustworthiness', 'reliability'], antonyms: ['unreliability'] },
        'deteriorate': { pos: 'verb', meaning: 'to become progressively worse', urdu: 'خراب ہونا', synonyms: ['worsen', 'decline'], antonyms: ['improve'] },
        'dichotomy': { pos: 'noun', meaning: 'a division between two opposed things', urdu: 'دو حصوں میں تقسیم', synonyms: ['division', 'contrast'], antonyms: ['unity'] },
        'discrepancy': { pos: 'noun', meaning: 'a lack of compatibility between facts', urdu: 'تفاوت', synonyms: ['difference', 'inconsistency'], antonyms: ['agreement'] },
        'disseminate': { pos: 'verb', meaning: 'to spread information widely', urdu: 'پھیلانا', synonyms: ['spread', 'circulate'], antonyms: ['conceal'] },
        'divergent': { pos: 'adjective', meaning: 'tending to be different or develop in different directions', urdu: 'مختلف سمتوں میں جانے والا', synonyms: ['different', 'varying'], antonyms: ['similar'] },
        'docile': { pos: 'adjective', meaning: 'ready to accept control or instruction', urdu: 'فرمانبردار', synonyms: ['obedient', 'submissive'], antonyms: ['stubborn'] },
        'dubious': { pos: 'adjective', meaning: 'hesitating or doubting; not to be relied upon', urdu: 'مشکوک', synonyms: ['doubtful', 'suspicious'], antonyms: ['certain'] },
        'efficacy': { pos: 'noun', meaning: 'the ability to produce a desired result', urdu: 'اثرائیت', synonyms: ['effectiveness', 'efficiency'], antonyms: ['ineffectiveness'] },
        'elicit': { pos: 'verb', meaning: 'to draw out a response or answer', urdu: 'نکلوانا', synonyms: ['extract', 'evoke'], antonyms: ['suppress'] },
        'emulate': { pos: 'verb', meaning: 'to match or surpass by imitation', urdu: 'تقلید کرنا', synonyms: ['imitate', 'copy'], antonyms: ['originate'] },
        'endorse': { pos: 'verb', meaning: 'to declare one\'s public approval or support', urdu: 'تائید کرنا', synonyms: ['approve', 'support'], antonyms: ['reject'] },
        'enhance': { pos: 'verb', meaning: 'to intensify, increase, or further improve', urdu: 'بڑھانا، بہتر بنانا', synonyms: ['improve', 'boost'], antonyms: ['diminish'] },
        'enumerate': { pos: 'verb', meaning: 'to mention a number of things one by one', urdu: 'گننا', synonyms: ['list', 'itemize'], antonyms: [] },
        'epitome': { pos: 'noun', meaning: 'a perfect example of a particular quality', urdu: 'مثال', synonyms: ['example', 'embodiment'], antonyms: [] },
        'equitable': { pos: 'adjective', meaning: 'fair and impartial', urdu: 'منصفانہ', synonyms: ['fair', 'just'], antonyms: ['unfair'] },
        'eradicate': { pos: 'verb', meaning: 'to destroy completely; put an end to', urdu: 'ختم کرنا', synonyms: ['eliminate', 'abolish'], antonyms: ['establish'] },
        'erroneous': { pos: 'adjective', meaning: 'wrong; incorrect', urdu: 'غلط', synonyms: ['incorrect', 'false'], antonyms: ['correct'] },
        'exacerbate': { pos: 'verb', meaning: 'to make a problem worse', urdu: 'مزید خراب کرنا', synonyms: ['worsen', 'aggravate'], antonyms: ['alleviate'] },
        'exemplary': { pos: 'adjective', meaning: 'serving as a desirable model', urdu: 'نمونہ', synonyms: ['ideal', 'perfect'], antonyms: ['terrible'] },
        'expenditure': { pos: 'noun', meaning: 'the action of spending funds', urdu: 'اخراجات', synonyms: ['expense', 'spending'], antonyms: ['income'] },
        'explicit': { pos: 'adjective', meaning: 'stated clearly and in detail', urdu: 'واضح', synonyms: ['clear', 'specific'], antonyms: ['implicit', 'vague'] },
        'facilitate': { pos: 'verb', meaning: 'to make an action or process easier', urdu: 'آسان بنانا', synonyms: ['assist', 'help'], antonyms: ['hinder'] },
        'feasible': { pos: 'adjective', meaning: 'possible to do easily or conveniently', urdu: 'ممکن', synonyms: ['possible', 'practical'], antonyms: ['impossible'] },
        'fluctuate': { pos: 'verb', meaning: 'to rise and fall irregularly', urdu: 'اتار چڑھاؤ آنا', synonyms: ['vary', 'change'], antonyms: ['stabilize'] },
        'framework': { pos: 'noun', meaning: 'a basic structure underlying a system', urdu: 'ڈھانچہ', synonyms: ['structure', 'system'], antonyms: [] },
        'garner': { pos: 'verb', meaning: 'to gather or collect', urdu: 'جمع کرنا', synonyms: ['gather', 'collect'], antonyms: ['scatter'] },
        'gratuitous': { pos: 'adjective', meaning: 'uncalled for; lacking good reason', urdu: 'بلاوجہ', synonyms: ['unnecessary', 'uncalled-for'], antonyms: ['necessary'] },
        'heterogeneous': { pos: 'adjective', meaning: 'diverse in character or content', urdu: 'مختلف اقسام کا', synonyms: ['diverse', 'mixed'], antonyms: ['homogeneous'] },
        'hierarchy': { pos: 'noun', meaning: 'a system of ranking', urdu: 'درجہ بندی', synonyms: ['ranking', 'order'], antonyms: [] },
        'hypothetical': { pos: 'adjective', meaning: 'based on a suggested idea or theory', urdu: 'فرضی', synonyms: ['theoretical', 'assumed'], antonyms: ['actual'] },
        'ideology': { pos: 'noun', meaning: 'a system of ideas and ideals', urdu: 'نظریہ', synonyms: ['philosophy', 'doctrine'], antonyms: [] },
        'impetus': { pos: 'noun', meaning: 'the force or energy with which a body moves', urdu: 'قوت', synonyms: ['momentum', 'drive'], antonyms: [] },
        'implement': { pos: 'verb', meaning: 'to put a decision or plan into effect', urdu: 'نافذ کرنا', synonyms: ['execute', 'carry out'], antonyms: ['cancel'] },
        'implicit': { pos: 'adjective', meaning: 'implied though not plainly expressed', urdu: 'پوشیدہ', synonyms: ['implied', 'understood'], antonyms: ['explicit'] },
        'inadvertently': { pos: 'adverb', meaning: 'without intention; accidentally', urdu: 'غیر ارادی طور پر', synonyms: ['accidentally', 'unintentionally'], antonyms: ['deliberately'] },
        'incentive': { pos: 'noun', meaning: 'a thing that motivates or encourages', urdu: 'حوصلہ افزائی', synonyms: ['motivation', 'inducement'], antonyms: ['deterrent'] },
        'inclination': { pos: 'noun', meaning: 'a person\'s natural tendency or urge', urdu: 'رجحان', synonyms: ['tendency', 'preference'], antonyms: ['aversion'] },
        'indigenous': { pos: 'adjective', meaning: 'originating or occurring naturally in a place', urdu: 'مقامی', synonyms: ['native', 'local'], antonyms: ['foreign'] },
        'inevitable': { pos: 'adjective', meaning: 'certain to happen; unavoidable', urdu: 'ناگزیر', synonyms: ['unavoidable', 'certain'], antonyms: ['avoidable'] },
        'infrastructure': { pos: 'noun', meaning: 'basic physical systems of a country', urdu: 'بنیادی ڈھانچہ', synonyms: ['facilities', 'system'], antonyms: [] },
        'inherent': { pos: 'adjective', meaning: 'existing as a permanent attribute', urdu: 'فطری', synonyms: ['innate', 'natural'], antonyms: ['acquired'] },
        'initiative': { pos: 'noun', meaning: 'the ability to assess and begin things independently', urdu: 'پہل', synonyms: ['enterprise', 'drive'], antonyms: ['inertia'] },
        'innovative': { pos: 'adjective', meaning: 'featuring new methods; creative', urdu: 'جدید', synonyms: ['creative', 'original'], antonyms: ['traditional'] },
        'integral': { pos: 'adjective', meaning: 'necessary to make a whole complete', urdu: 'ضروری', synonyms: ['essential', 'fundamental'], antonyms: ['unnecessary'] },
        'intermittent': { pos: 'adjective', meaning: 'occurring at irregular intervals', urdu: 'رک رک کر ہونے والا', synonyms: ['sporadic', 'periodic'], antonyms: ['continuous'] },
        'intricate': { pos: 'adjective', meaning: 'very complicated or detailed', urdu: 'پیچیدہ', synonyms: ['complex', 'complicated'], antonyms: ['simple'] },
        'ironic': { pos: 'adjective', meaning: 'using or displaying irony', urdu: 'طنزیہ', synonyms: ['sarcastic', 'satirical'], antonyms: ['serious'] },
        'legitimate': { pos: 'adjective', meaning: 'conforming to the law or rules', urdu: 'جائز', synonyms: ['legal', 'valid'], antonyms: ['illegal'] },
        'lucid': { pos: 'adjective', meaning: 'expressed clearly; easy to understand', urdu: 'واضح', synonyms: ['clear', 'coherent'], antonyms: ['confusing'] },
        'manifest': { pos: 'adjective', meaning: 'clear or obvious to the eye or mind', urdu: 'ظاہر', synonyms: ['evident', 'obvious'], antonyms: ['hidden'] },
        'mitigate': { pos: 'verb', meaning: 'to make less severe or painful', urdu: 'کم کرنا', synonyms: ['alleviate', 'reduce'], antonyms: ['aggravate'] },
        'narrative': { pos: 'noun', meaning: 'a spoken or written account of events', urdu: 'بیان', synonyms: ['story', 'account'], antonyms: [] },
        'notorious': { pos: 'adjective', meaning: 'famous for some bad quality', urdu: 'بدنام', synonyms: ['infamous', 'disreputable'], antonyms: ['famous'] },
        'novel': { pos: 'adjective', meaning: 'new or unusual in an interesting way', urdu: 'نیا', synonyms: ['new', 'original'], antonyms: ['old'] },
        'nuance': { pos: 'noun', meaning: 'a subtle difference in meaning or expression', urdu: 'باریکی', synonyms: ['subtlety', 'shade'], antonyms: [] },
        'objective': { pos: 'adjective', meaning: 'not influenced by personal feelings', urdu: 'غیر جانبدارانہ', synonyms: ['neutral', 'impartial'], antonyms: ['subjective'] },
        'obligatory': { pos: 'adjective', meaning: 'required by a legal, moral rule', urdu: 'لازمی', synonyms: ['mandatory', 'compulsory'], antonyms: ['optional'] },
        'obsolete': { pos: 'adjective', meaning: 'no longer produced or used', urdu: 'متروک', synonyms: ['outdated', 'archaic'], antonyms: ['modern'] },
        'paradigm': { pos: 'noun', meaning: 'a typical example or pattern of something', urdu: 'نمونہ', synonyms: ['model', 'pattern'], antonyms: [] },
        'paradox': { pos: 'noun', meaning: 'a statement that contradicts itself', urdu: 'خود تضادی', synonyms: ['contradiction', 'inconsistency'], antonyms: [] },
        'paramount': { pos: 'adjective', meaning: 'more important than anything else', urdu: 'سب سے اہم', synonyms: ['supreme', 'foremost'], antonyms: ['次要'] },
        'partisan': { pos: 'adjective', meaning: 'biased in support of a party', urdu: 'جماعتی', synonyms: ['biased', 'one-sided'], antonyms: ['neutral'] },
        'perceive': { pos: 'verb', meaning: 'to become aware of through the senses', urdu: 'محسوس کرنا', synonyms: ['notice', 'observe'], antonyms: ['ignore'] },
        'perspective': { pos: 'noun', meaning: 'a particular attitude or way of regarding something', urdu: 'نقطہ نظر', synonyms: ['viewpoint', 'outlook'], antonyms: [] },
        'pertinent': { pos: 'adjective', meaning: 'relevant or applicable to a matter', urdu: 'متعلقہ', synonyms: ['relevant', 'applicable'], antonyms: ['irrelevant'] },
        'phenomenon': { pos: 'noun', meaning: 'a fact or situation observed to exist', urdu: 'واقعہ', synonyms: ['occurrence', 'event'], antonyms: [] },
        'plausible': { pos: 'adjective', meaning: 'seeming reasonable or probable', urdu: 'معقول', synonyms: ['reasonable', 'credible'], antonyms: ['implausible'] },
        'policy': { pos: 'noun', meaning: 'a course of action adopted by an organization', urdu: 'پالیسی', synonyms: ['plan', 'strategy'], antonyms: [] },
        'ponder': { pos: 'verb', meaning: 'to think about something carefully', urdu: 'غور و فکر کرنا', synonyms: ['contemplate', 'consider'], antonyms: ['ignore'] },
        'precedent': { pos: 'noun', meaning: 'an earlier event used as a guide', urdu: 'سابقہ', synonyms: ['example', 'standard'], antonyms: [] },
        'precise': { pos: 'adjective', meaning: 'marked by exactness and accuracy', urdu: 'درست', synonyms: ['exact', 'accurate'], antonyms: ['imprecise'] },
        'predicament': { pos: 'noun', meaning: 'a difficult or unpleasant situation', urdu: 'مصیبت', synonyms: ['dilemma', 'plight'], antonyms: [] },
        'premise': { pos: 'noun', meaning: 'a previous statement from which another follows', urdu: 'فرض', synonyms: ['assumption', 'proposition'], antonyms: [] },
        'prerequisite': { pos: 'noun', meaning: 'a thing required as a prior condition', urdu: 'پیش شرط', synonyms: ['requirement', 'condition'], antonyms: [] },
        'prevail': { pos: 'verb', meaning: 'to prove more powerful or superior', urdu: 'غالب آنا', synonyms: ['triumph', 'win'], antonyms: ['fail'] },
        'proactive': { pos: 'adjective', meaning: 'creating or controlling a situation', urdu: 'پیش بند', synonyms: ['active', 'enterprising'], antonyms: ['reactive'] },
        'prohibit': { pos: 'verb', meaning: 'to formally forbid by law or rule', urdu: 'ممنوع کرنا', synonyms: ['forbid', 'ban'], antonyms: ['permit'] },
        'proliferate': { pos: 'verb', meaning: 'to increase rapidly in numbers', urdu: 'تیزی سے پھیلنا', synonyms: ['multiply', 'spread'], antonyms: ['decrease'] },
        'prominent': { pos: 'adjective', meaning: 'important; famous', urdu: 'مشہور', synonyms: ['notable', 'distinguished'], antonyms: ['obscure'] },
        'prosperity': { pos: 'noun', meaning: 'the state of being successful and wealthy', urdu: 'خوشحالی', synonyms: ['success', 'wealth'], antonyms: ['poverty'] },
        'protocol': { pos: 'noun', meaning: 'the official procedure governing affairs', urdu: 'پروٹوکول', synonyms: ['procedure', 'etiquette'], antonyms: [] },
        'prudent': { pos: 'adjective', meaning: 'acting with care for the future', urdu: 'دور اندیش', synonyms: ['wise', 'cautious'], antonyms: ['reckless'] },
        'radical': { pos: 'adjective', meaning: 'far-reaching or thorough', urdu: 'بنیادی', synonyms: ['extreme', 'revolutionary'], antonyms: ['moderate'] },
        'ratify': { pos: 'verb', meaning: 'to sign or give formal consent', urdu: 'توثیق کرنا', synonyms: ['approve', 'confirm'], antonyms: ['reject'] },
        'reconcile': { pos: 'verb', meaning: 'to restore friendly relations', urdu: 'ملانا', synonyms: ['harmonize', 'resolve'], antonyms: ['divide'] },
        'reform': { pos: 'noun', meaning: 'the action of making improvements', urdu: 'اصلاح', synonyms: ['improvement', 'change'], antonyms: [] },
        'refute': { pos: 'verb', meaning: 'to prove a statement false', urdu: 'رد کرنا', synonyms: ['disprove', 'deny'], antonyms: ['prove'] },
        'reiterate': { pos: 'verb', meaning: 'to say something again', urdu: 'دہرانا', synonyms: ['repeat', 'restate'], antonyms: [] },
        'relevant': { pos: 'adjective', meaning: 'closely connected to the subject', urdu: 'متعلقہ', synonyms: ['pertinent', 'applicable'], antonyms: ['irrelevant'] },
        'remedy': { pos: 'noun', meaning: 'a means of counteracting or eliminating', urdu: 'علاج', synonyms: ['solution', 'cure'], antonyms: ['problem'] },
        'rendition': { pos: 'noun', meaning: 'a performance or interpretation', urdu: 'پیشکش', synonyms: ['performance', 'version'], antonyms: [] },
        'repudiate': { pos: 'verb', meaning: 'to refuse to accept or be associated', urdu: 'انکار کرنا', synonyms: ['reject', 'deny'], antonyms: ['accept'] },
        'resilient': { pos: 'adjective', meaning: 'able to recover quickly', urdu: 'لچکدار', synonyms: ['flexible', 'adaptable'], antonyms: ['rigid'] },
        'resolute': { pos: 'adjective', meaning: 'admirably purposeful and determined', urdu: 'پرعزم', synonyms: ['determined', 'firm'], antonyms: ['wavering'] },
        'reticent': { pos: 'adjective', meaning: 'not revealing one\'s thoughts easily', urdu: 'خاموش طبع', synonyms: ['reserved', 'quiet'], antonyms: ['talkative'] },
        'scrutinize': { pos: 'verb', meaning: 'to examine closely', urdu: 'جانچنا', synonyms: ['examine', 'inspect'], antonyms: ['ignore'] },
        'simulate': { pos: 'verb', meaning: 'to imitate the appearance of', urdu: 'نقل کرنا', synonyms: ['imitate', 'mimic'], antonyms: ['be genuine'] },
        'skepticism': { pos: 'noun', meaning: 'a doubtful attitude', urdu: 'شک', synonyms: ['doubt', 'suspicion'], antonyms: ['belief'] },
        'speculate': { pos: 'verb', meaning: 'to form a theory without firm evidence', urdu: 'قیاس آرائی کرنا', synonyms: ['guess', 'conjecture'], antonyms: ['know'] },
        'spontaneous': { pos: 'adjective', meaning: 'performed without planning', urdu: 'خود بخود', synonyms: ['unplanned', 'natural'], antonyms: ['planned'] },
        'stagnant': { pos: 'adjective', meaning: 'showing no activity or growth', urdu: 'رکا ہوا', synonyms: ['inactive', 'sluggish'], antonyms: ['active'] },
        'stringent': { pos: 'adjective', meaning: 'strict, precise, and exacting', urdu: 'سخت', synonyms: ['strict', 'rigorous'], antonyms: ['lenient'] },
        'subjective': { pos: 'adjective', meaning: 'based on personal feelings', urdu: 'ذاتی', synonyms: ['personal', 'individual'], antonyms: ['objective'] },
        'substantiate': { pos: 'verb', meaning: 'to provide evidence to support', urdu: 'ثابت کرنا', synonyms: ['verify', 'confirm'], antonyms: ['disprove'] },
        'substantive': { pos: 'adjective', meaning: 'having a firm basis in reality', urdu: 'اہم', synonyms: ['significant', 'important'], antonyms: ['trivial'] },
        'superficial': { pos: 'adjective', meaning: 'existing only on the surface', urdu: 'سطحی', synonyms: ['shallow', 'surface'], antonyms: ['deep'] },
        'surveillance': { pos: 'noun', meaning: 'close observation of a person or group', urdu: 'نگرانی', synonyms: ['monitoring', 'observation'], antonyms: [] },
        'sustainable': { pos: 'adjective', meaning: 'able to be maintained at a certain rate', urdu: 'پائیدار', synonyms: ['maintainable', 'endurable'], antonyms: ['unsustainable'] },
        'tacit': { pos: 'adjective', meaning: 'understood without being stated', urdu: 'خاموش', synonyms: ['implied', 'unspoken'], antonyms: ['explicit'] },
        'tangible': { pos: 'adjective', meaning: 'perceptible by touch; clear', urdu: 'محسوس', synonyms: ['real', 'concrete'], antonyms: ['intangible'] },
        'tedious': { pos: 'adjective', meaning: 'too long, slow, or dull', urdu: 'تھکا دینے والا', synonyms: ['boring', 'monotonous'], antonyms: ['interesting'] },
        'tentative': { pos: 'adjective', meaning: 'not certain or fixed', urdu: 'عارضی', synonyms: ['provisional', 'uncertain'], antonyms: ['definite'] },
        'terminate': { pos: 'verb', meaning: 'to bring to an end', urdu: 'ختم کرنا', synonyms: ['end', 'conclude'], antonyms: ['begin'] },
        'testimony': { pos: 'noun', meaning: 'a formal written or spoken statement', urdu: 'گواہی', synonyms: ['evidence', 'statement'], antonyms: [] },
        'thrive': { pos: 'verb', meaning: 'to grow or develop well', urdu: 'پھلنا پھولنا', synonyms: ['prosper', 'flourish'], antonyms: ['fail'] },
        'tolerance': { pos: 'noun', meaning: 'the ability to accept different opinions', urdu: 'بردباری', synonyms: ['acceptance', 'patience'], antonyms: ['intolerance'] },
        'transparent': { pos: 'adjective', meaning: 'easy to perceive or detect', urdu: 'شفاف', synonyms: ['clear', 'open'], antonyms: ['opaque'] },
        'turmoil': { pos: 'noun', meaning: 'a state of great disturbance', urdu: 'افرا تفری', synonyms: ['chaos', 'confusion'], antonyms: ['order'] },
        'ultimate': { pos: 'adjective', meaning: 'being the last in a series', urdu: 'آخری', synonyms: ['final', 'last'], antonyms: ['initial'] },
        'unprecedented': { pos: 'adjective', meaning: 'never done or known before', urdu: 'ناقابل مثال', synonyms: ['unparalleled', 'extraordinary'], antonyms: ['common'] },
        'utilize': { pos: 'verb', meaning: 'to make practical use of', urdu: 'استعمال کرنا', synonyms: ['use', 'employ'], antonyms: [] },
        'validate': { pos: 'verb', meaning: 'to check or prove the validity of', urdu: 'تصدیق کرنا', synonyms: ['verify', 'confirm'], antonyms: ['invalidate'] },
        'viable': { pos: 'adjective', meaning: 'capable of working successfully', urdu: 'قابل عمل', synonyms: ['feasible', 'workable'], antonyms: ['unworkable'] },
        'vindicate': { pos: 'verb', meaning: 'to clear someone of blame', urdu: 'بری الذمہ ٹھہرانا', synonyms: ['justify', 'absolve'], antonyms: ['condemn'] },
        'virtuous': { pos: 'adjective', meaning: 'having high moral standards', urdu: 'نیک', synonyms: ['righteous', 'moral'], antonyms: ['wicked'] },
        'volatile': { pos: 'adjective', meaning: 'liable to change rapidly', urdu: 'عارضی مزاج', synonyms: ['unstable', 'changeable'], antonyms: ['stable'] },
        'vulnerable': { pos: 'adjective', meaning: 'susceptible to physical or emotional harm', urdu: 'کمzor', synonyms: ['weak', 'exposed'], antonyms: ['strong'] },
        'warrant': { pos: 'verb', meaning: 'to justify or necessitate', urdu: 'جواز بننا', synonyms: ['justify', 'merit'], antonyms: [] }
    },

    /**
     * Extract vocabulary words from text
     * @param {string} text - Input article text
     * @returns {Array} Array of vocabulary objects
     */
    extractWords(text) {
        const words = [];
        const lowerText = text.toLowerCase();
        
        // Split text into words and clean them
        const textWords = text.split(/\s+/).map(word => 
            word.replace(/[^\w]/g, '').toLowerCase()
        );

        // Find matches in our database
        for (const [word, data] of Object.entries(this.wordDatabase)) {
            if (textWords.includes(word)) {
                words.push({
                    word: word,
                    pos: data.pos,
                    meaning: data.meaning,
                    urdu: data.urdu,
                    synonyms: data.synonyms,
                    antonyms: data.antonyms,
                    example: this.generateExample(word, data.meaning),
                    importance: this.calculateImportance(word, text)
                });
            }
        }

        // Sort by importance and return top 15
        words.sort((a, b) => {
            const importanceOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return importanceOrder[b.importance] - importanceOrder[a.importance];
        });

        return words.slice(0, 15);
    },

    /**
     * Generate example sentence for a word
     * @param {string} word - The word
     * @param {string} meaning - Word meaning
     * @returns {string} Example sentence
     */
    generateExample(word, meaning) {
        const templates = [
            `The government's ${word} approach helped resolve the crisis.`,
            `Experts believe that ${word} measures are necessary for progress.`,
            `The ${word} nature of the situation requires immediate attention.`,
            `This ${word} policy has significant implications for the economy.`,
            `Analysts describe the development as ${word} but promising.`
        ];
        
        return templates[Math.floor(Math.random() * templates.length)];
    },

    /**
     * Calculate CSS importance score for a word
     * @param {string} word - The word
     * @param {string} text - Source text
     * @returns {string} Importance level
     */
    calculateImportance(word, text) {
        const highImportanceWords = [
            'accountability', 'bureaucracy', 'governance', 'reform', 'policy',
            'infrastructure', 'economy', 'sustainable', 'framework', 'initiative'
        ];

        const mediumImportanceWords = [
            'comprehensive', 'facilitate', 'implement', 'strategy', 'objective',
            'perspective', 'significant', 'substantial', 'potential', 'critical'
        ];

        if (highImportanceWords.includes(word)) return 'High';
        if (mediumImportanceWords.includes(word)) return 'Medium';
        return 'Low';
    },

    /**
     * Get high-value CSS words from extracted vocabulary
     * @param {Array} vocabulary - Array of vocabulary objects
     * @returns {Array} Top 5 high-value words
     */
    getHighValueWords(vocabulary) {
        return vocabulary
            .filter(word => word.importance === 'High')
            .slice(0, 5);
    },

    /**
     * Generate sentence completion exercises
     * @param {Array} vocabulary - Array of vocabulary objects
     * @returns {Array} Exercise objects
     */
    generateSentenceExercises(vocabulary) {
        const exercises = [];
        
        vocabulary.slice(0, 5).forEach(item => {
            const sentence = item.example;
            const blanked = sentence.replace(new RegExp(`\\b${item.word}\\b`, 'i'), '_____');
            
            exercises.push({
                question: blanked,
                answer: item.word,
                options: this.generateOptions(item.word, vocabulary)
            });
        });

        return exercises;
    },

    /**
     * Generate multiple choice options for exercises
     * @param {string} correctWord - The correct answer
     * @param {Array} vocabulary - Full vocabulary list
     * @returns {Array} Options array
     */
    generateOptions(correctWord, vocabulary) {
        const otherWords = vocabulary
            .filter(w => w.word !== correctWord)
            .map(w => w.word);
        
        // Shuffle and pick 3 distractors
        const shuffled = otherWords.sort(() => 0.5 - Math.random());
        const distractors = shuffled.slice(0, 3);
        
        const options = [...distractors, correctWord];
        return options.sort(() => 0.5 - Math.random());
    },

    /**
     * Generate vocabulary MCQs
     * @param {Array} vocabulary - Array of vocabulary objects
     * @returns {Array} MCQ objects
     */
    generateMCQs(vocabulary) {
        const mcqs = [];

        vocabulary.slice(0, 5).forEach((item, index) => {
            const questionTypes = [
                {
                    question: `What is the meaning of "${item.word}"?`,
                    correct: item.meaning,
                    distractors: this.getDistractorMeanings(item.word, vocabulary)
                },
                {
                    question: `Choose the synonym of "${item.word}":`,
                    correct: item.synonyms[0] || 'N/A',
                    distractors: this.getAntonymsAsDistractors(item)
                }
            ];

            questionTypes.forEach(type => {
                const options = [...type.distractors.slice(0, 3), type.correct];
                mcqs.push({
                    question: type.question,
                    options: options.sort(() => 0.5 - Math.random()),
                    correct: type.correct,
                    explanation: `"${item.word}" means ${item.meaning}.`
                });
            });
        });

        return mcqs.slice(0, 5);
    },

    /**
     * Get distractor meanings for MCQs
     * @param {string} word - Current word
     * @param {Array} vocabulary - Full vocabulary
     * @returns {Array} Distractor meanings
     */
    getDistractorMeanings(word, vocabulary) {
        return vocabulary
            .filter(w => w.word !== word)
            .map(w => w.meaning)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
    },

    /**
     * Get antonyms as distractors
     * @param {Object} item - Vocabulary item
     * @returns {Array} Antonyms
     */
    getAntonymsAsDistractors(item) {
        if (item.antonyms && item.antonyms.length > 0) {
            return item.antonyms;
        }
        return ['unrelated', 'opposite', 'different'].slice(0, 3);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Vocabulary;
}
