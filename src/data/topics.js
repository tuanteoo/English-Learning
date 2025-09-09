// Basic topic data with sample vocabulary and IPA transcriptions
export const TOPICS = [
  {
    slug: 'animals',
    name: 'Animals',
    icon: '🐾',
    words: [
      { word: 'cat', ipa: '/kæt/', pos: 'n.', vi: 'mèo', example: 'The cat sleeps on the sofa.', emoji: '🐱' },
      { word: 'dog', ipa: '/dɔːɡ/', pos: 'n.', vi: 'chó', example: 'The dog is barking loudly in the yard.', emoji: '🐶' },
      { word: 'bird', ipa: '/bɜːd/', pos: 'n.', vi: 'chim', example: 'A small bird is sitting on the branch.', emoji: '🐦' },
      { word: 'lion', ipa: '/ˈlaɪ.ən/', pos: 'n.', vi: 'sư tử', example: 'The lion roars across the savanna.', emoji: '🦁' },
      { word: 'elephant', ipa: '/ˈɛl.ɪ.fənt/', pos: 'n.', vi: 'voi', example: 'The elephant drinks water at the river.', emoji: '🐘' },
    ],
  },
  {
    slug: 'food-and-drinks',
    name: 'Food & Drinks',
    icon: '🍎',
    words: [
      { word: 'apple', ipa: '/ˈæp.əl/', pos: 'n.', vi: 'táo', example: 'She eats an apple every morning.', emoji: '🍎' },
      { word: 'bread', ipa: '/brɛd/', pos: 'n.', vi: 'bánh mì', example: 'We bought fresh bread from the bakery.', emoji: '🍞' },
      { word: 'water', ipa: '/ˈwɔː.tə/', pos: 'n.', vi: 'nước', example: 'Please drink water after your run.', emoji: '💧' },
      { word: 'milk', ipa: '/mɪlk/', pos: 'n.', vi: 'sữa', example: 'He poured milk into the glass.', emoji: '🥛' },
      { word: 'coffee', ipa: '/ˈkɒf.i/ (UK), /ˈkɔː.fi/ (US)', pos: 'n.', vi: 'cà phê', example: 'I like coffee with a little sugar.', emoji: '☕' },
    ],
  },
  {
    slug: 'travel',
    name: 'Travel',
    icon: '✈️',
    words: [
      { word: 'ticket', ipa: '/ˈtɪk.ɪt/', pos: 'n.', vi: 'vé', example: 'I bought a train ticket to London.', emoji: '🎫' },
      { word: 'airport', ipa: '/ˈeə.pɔːt/', pos: 'n.', vi: 'sân bay', example: 'We arrived at the airport early.', emoji: '✈️' },
      { word: 'luggage', ipa: '/ˈlʌɡ.ɪdʒ/', pos: 'n.', vi: 'hành lý', example: 'Her luggage is very heavy.', emoji: '🧳' },
      { word: 'hotel', ipa: '/həʊˈtɛl/', pos: 'n.', vi: 'khách sạn', example: 'They stayed at a hotel near the beach.', emoji: '🏨' },
      { word: 'map', ipa: '/mæp/', pos: 'n.', vi: 'bản đồ', example: 'Use the map to find the museum.', emoji: '🗺️' },
    ],
  },
  {
    slug: 'colors',
    name: 'Colors',
    icon: '🎨',
    words: [
      { word: 'red', ipa: '/rɛd/', pos: 'adj.', vi: 'đỏ', example: 'The red car is very fast.', emoji: '🔴' },
      { word: 'blue', ipa: '/bluː/', pos: 'adj.', vi: 'xanh dương', example: 'The sky is blue today.', emoji: '🔵' },
      { word: 'green', ipa: '/ɡriːn/', pos: 'adj.', vi: 'xanh lá', example: 'He wore a green jacket.', emoji: '🟢' },
      { word: 'yellow', ipa: '/ˈjɛl.oʊ/', pos: 'adj.', vi: 'vàng', example: 'There is a yellow flower in the garden.', emoji: '🟡' },
      { word: 'purple', ipa: '/ˈpɜː.pəl/', pos: 'adj.', vi: 'tím', example: 'She bought a purple dress.', emoji: '🟣' },
    ],
  },
  {
    slug: 'numbers',
    name: 'Numbers',
    icon: '🔢',
    words: [
      { word: 'one', ipa: '/wʌn/', pos: 'num.', vi: 'một', example: 'I have one book.', emoji: '1️⃣' },
      { word: 'two', ipa: '/tuː/', pos: 'num.', vi: 'hai', example: 'We need two chairs.', emoji: '2️⃣' },
      { word: 'three', ipa: '/θriː/', pos: 'num.', vi: 'ba', example: 'She has three cats.', emoji: '3️⃣' },
      { word: 'four', ipa: '/fɔː/', pos: 'num.', vi: 'bốn', example: 'They planted four trees.', emoji: '4️⃣' },
      { word: 'five', ipa: '/faɪv/', pos: 'num.', vi: 'năm', example: 'Five people joined the class.', emoji: '5️⃣' },
    ],
  },
];

export function getTopicBySlug(slug) {
  return TOPICS.find((t) => t.slug === slug);
}
