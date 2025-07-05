import { Difficulty, WordData } from "./types";

export const ALPHABET = "QWERTYUIOPASDFGHJKLZXCVBNM";

export const WORD_LISTS: Record<Difficulty, WordData[]> = {
  easy: [
    { word: "CAT", imageUrl: "https://img.icons8.com/plasticine/100/cat.png" },
    { word: "DOG", imageUrl: "https://img.icons8.com/plasticine/100/dog.png" },
    { word: "SUN", imageUrl: "https://img.icons8.com/plasticine/100/sun.png" },
    { word: "RUN", imageUrl: "https://img.icons8.com/color/96/running.png" },
    {
      word: "BIG",
      imageUrl: "https://img.icons8.com/plasticine/100/elephant.png",
    },
    {
      word: "RED",
      imageUrl: "https://img.icons8.com/plasticine/100/apple.png",
    },
    { word: "PIG", imageUrl: "https://img.icons8.com/ios/100/pig.png" },
    {
      word: "HEN",
      imageUrl: "https://img.icons8.com/plasticine/100/chicken.png",
    },
    {
      word: "EGG",
      imageUrl: "https://img.icons8.com/emoji/48/egg-emoji.png",
    },
    { word: "CUP", imageUrl: "https://img.icons8.com/plasticine/100/cup.png" },
    {
      word: "HAT",
      imageUrl: "https://img.icons8.com/plasticine/100/top-hat.png",
    },
    {
      word: "TOP",
      imageUrl: "https://img.icons8.com/ios-filled/50/collapse-arrow.png",
    },
    { word: "BED", imageUrl: "https://img.icons8.com/plasticine/100/bed.png" },
    {
      word: "FLY",
      imageUrl: "https://img.icons8.com/ios-filled/50/paper-plane.png",
    },
    {
      word: "CRY",
      imageUrl: "https://img.icons8.com/emoji/96/crying-face.png",
    },
    { word: "SKY", imageUrl: "https://img.icons8.com/plasticine/100/sky.png" },
    { word: "MAP", imageUrl: "https://img.icons8.com/plasticine/100/map.png" },
    { word: "JAM", imageUrl: "https://img.icons8.com/color/96/jam.png" },
    { word: "KEY", imageUrl: "https://img.icons8.com/plasticine/100/key.png" },
    { word: "LOG", imageUrl: "https://img.icons8.com/ios/100/log.png" },
    { word: "BUG", imageUrl: "https://img.icons8.com/plasticine/100/bug.png" },
    {
      word: "MUD",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1059/1059501.png",
    },
    { word: "RAT", imageUrl: "https://img.icons8.com/emoji/48/rat-emoji.png" },
    { word: "SIT", imageUrl: "https://img.icons8.com/ios/50/counselor.png" },
    { word: "TEN", imageUrl: "https://img.icons8.com/officel/80/10.png" },
    { word: "BOX", imageUrl: "https://img.icons8.com/pastel-glyph/128/box--v2.png" },
    { word: "FOX", imageUrl: "https://img.icons8.com/plasticine/100/fox.png" },
    { word: "CAR", imageUrl: "https://img.icons8.com/plasticine/100/car.png" },
    { word: "BUS", imageUrl: "https://img.icons8.com/plasticine/100/bus.png" },
    {
      word: "JET",
      imageUrl: "https://img.icons8.com/ios/50/airplane-mode-on--v1.png",
    },
  ],
  medium: [
    {
      word: "APPLE",
      imageUrl: "https://img.icons8.com/plasticine/100/apple.png",
    },
    {
      word: "BEACH",
      imageUrl: "https://img.icons8.com/plasticine/100/beach.png",
    },
    {
      word: "CHAIR",
      imageUrl: "https://img.icons8.com/ios/100/chair.png",
    },
    {
      word: "EARTH",
      imageUrl: "https://img.icons8.com/color/48/earth-planet--v2.png",
    },
    {
      word: "FROG",
      imageUrl: "https://img.icons8.com/plasticine/100/frog.png",
    },
    {
      word: "GRAPE",
      imageUrl: "https://img.icons8.com/plasticine/100/grapes.png",
    },
    {
      word: "HOUSE",
      imageUrl: "https://img.icons8.com/plasticine/100/home.png",
    },
    {
      word: "ISLAND",
      imageUrl: "https://img.icons8.com/plasticine/100/island-on-water.png",
    },
    {
      word: "JELLY",
      imageUrl: "https://img.icons8.com/color/100/jellyfish.png",
    },
    { word: "KOALA", imageUrl: "https://img.icons8.com/fluency/48/koala.png" },
    {
      word: "LEMON",
      imageUrl: "https://img.icons8.com/emoji/48/lemon.png",
    },
    { word: "MOUSE", imageUrl: "https://img.icons8.com/officel/80/mouse.png" },
    {
      word: "NURSE",
      imageUrl: "https://img.icons8.com/officel/80/nurse-female.png",
    },
    {
      word: "OCEAN",
      imageUrl: "https://img.icons8.com/plasticine/100/ocean-wave.png",
    },
    {
      word: "PANDA",
      imageUrl: "https://img.icons8.com/plasticine/100/panda.png",
    },
    {
      word: "QUEEN",
      imageUrl: "https://img.icons8.com/fluency/48/moderator-female.png",
    },
    { word: "ROBOT", imageUrl: "https://img.icons8.com/officel/80/robot.png" },
    {
      word: "SNAKE",
      imageUrl: "https://img.icons8.com/color/100/snake.png",
    },
    {
      word: "TIGER",
      imageUrl: "https://img.icons8.com/emoji/48/tiger-emoji.png",
    },
    {
      word: "UMBRELLA",
      imageUrl: "https://img.icons8.com/plasticine/100/umbrella.png",
    },
    {
      word: "VOICE",
      imageUrl: "https://img.icons8.com/officel/80/voice-recognition-scan.png",
    },
    {
      word: "WHALE",
      imageUrl: "https://img.icons8.com/plasticine/100/whale.png",
    },
    {
      word: "XYLOPHONE",
      imageUrl: "https://img.icons8.com/color/100/xylophone.png",
    },
    { word: "YACHT", imageUrl: "https://img.icons8.com/officel/80/yacht.png" },
    {
      word: "ZEBRA",
      imageUrl: "https://img.icons8.com/emoji/48/zebra-emoji.png",
    },
    {
      word: "BREAD",
      imageUrl: "https://img.icons8.com/plasticine/100/bread.png",
    },
    {
      word: "CLOUD",
      imageUrl: "https://img.icons8.com/plasticine/100/cloud.png",
    },
    {
      word: "DANCE",
      imageUrl: "https://img.icons8.com/officel/80/dancing.png",
    },
    {
      word: "EAGLE",
      imageUrl: "https://img.icons8.com/emoji/48/eagle--v2.png",
    },
  ],
  hard: [
    {
      word: "ADVENTURE",
      imageUrl: "https://img.icons8.com/officel/80/compass.png",
    },
    {
      word: "BEAUTIFUL",
      imageUrl: "https://img.icons8.com/officel/80/diamond.png",
    },
    {
      word: "CHALLENGE",
      imageUrl: "https://img.icons8.com/officel/80/climbing.png",
    },
    {
      word: "DIFFICULT",
      imageUrl:
        "https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-maze-with-multiple-pathways-open-and-close-startup-filled-tal-revivo.png",
    },
    {
      word: "EXCITING",
      imageUrl:
        "https://img.icons8.com/external-stick-figures-gan-khoon-lay/51/external-body-woman-basic-body-language-stick-figures-gan-khoon-lay.png",
    },
    {
      word: "FANTASTIC",
      imageUrl: "https://img.icons8.com/officel/80/unicorn.png",
    },
    {
      word: "GORGEOUS",
      imageUrl: "https://img.icons8.com/color/100/peacock.png",
    },
    {
      word: "HAPPINESS",
      imageUrl: "https://img.icons8.com/color/100/smiling-face-with-heart.png",
    },
    {
      word: "IMAGINATION",
      imageUrl: "https://img.icons8.com/officel/80/idea.png",
    },
    {
      word: "JUBILANT",
      imageUrl: "https://img.icons8.com/officel/80/confetti.png",
    },
    {
      word: "KNOWLEDGE",
      imageUrl: "https://img.icons8.com/plasticine/100/book.png",
    },
    {
      word: "LUMINOUS",
      imageUrl: "https://img.icons8.com/fluency/48/light.png",
    },
    {
      word: "MAGNIFICENT",
      imageUrl: "https://img.icons8.com/plasticine/100/castle.png",
    },
    {
      word: "NOSTALGIA",
      imageUrl:
        "https://img.icons8.com/fluency/48/old-fashioned-family-photo.png",
    },
    {
      word: "OPPORTUNITY",
      imageUrl:
        "https://img.icons8.com/external-parzival-1997-detailed-outline-parzival-1997/64/external-opportunity-human-resource-management-parzival-1997-detailed-outline-parzival-1997.png",
    },
    {
      word: "PHENOMENAL",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuIKeoF5yr0LK-ttmAqBIddj0VEeDvL07Pxg&s",
    },
    {
      word: "QUINTESSENCE",
      imageUrl: "https://img.icons8.com/plasticine/100/star.png",
    },
    {
      word: "RESPONSIBILITY",
      imageUrl: "https://img.icons8.com/ios/50/thumb-up--v1.png",
    },
    {
      word: "SPECTACULAR",
      imageUrl: "https://img.icons8.com/officel/80/binoculars.png",
    },
    {
      word: "TREMENDOUS",
      imageUrl: "https://img.icons8.com/plasticine/100/whale.png",
    },
    {
      word: "UNFORGETTABLE",
      imageUrl:
        "https://img.icons8.com/external-filled-outline-geotatah/64/external-alzheimer-alzheimers-disease-symbol-color-filled-outline-geotatah.png",
    },
    {
      word: "VIBRANT",
      imageUrl: "https://img.icons8.com/plasticine/100/paint-palette.png",
    },
    {
      word: "WONDERFUL",
      imageUrl:
        "https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-wonderful-emoticon-tanah-basah-basic-outline-tanah-basah.png",
    },
    {
      word: "ACCOMMODATE",
      imageUrl: "https://img.icons8.com/plasticine/100/home.png",
    },
    {
      word: "BRILLIANT",
      imageUrl: "https://img.icons8.com/officel/80/diamond.png",
    },
    {
      word: "CONSCIOUS",
      imageUrl: "https://img.icons8.com/officel/80/brain.png",
    },
    {
      word: "DELICIOUS",
      imageUrl: "https://img.icons8.com/emoji/48/face-savoring-food.png",
    },
    {
      word: "EFFERVESCENT",
      imageUrl:
        "https://img.icons8.com/external-photo3ideastudio-lineal-photo3ideastudio/64/external-effervescent-gym-photo3ideastudio-lineal-photo3ideastudio.png",
    },
    {
      word: "FLABBERGASTED",
      imageUrl: "https://img.icons8.com/ios/50/surprised.png",
    },
  ],
};
