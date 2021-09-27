export interface IShow {
  name: string;
  description?: string;
  metadata: IShowMetadata;
  endorsed?: boolean;
  imageUrl: string;
  url: string;
}

export interface IShowMetadata {
  isComedy: boolean;
  isWholesome: boolean;
  isNonfiction: boolean;
  isCrime: boolean;
  isAnimated: boolean;
  isScary: boolean;
  isOld: boolean;
}

export interface IChoice {
  question: string;
  yes?: string;
  no?: string;
}

export const questionMapping: Readonly<Record<keyof IShowMetadata, IChoice>> = Object.freeze({
  isComedy: {
    question: `Do you like funny shows?`,
    yes: `Ya, make me giggle!`,
    no: `No, serious shows only pls`,
  },

  isWholesome: {
    question: `How wholesome do you like your shows?`,
    yes: `If it's not PG, it's not for me`,
    no: `Give me something crass!`
  },

  isNonfiction: {
    question: `Do you want your show to be based in fact / have some truth to it?`,
    yes: `Of course, that way it counts as learning`,
    no: `No, get me as far from reality as I can be`
  },

  isCrime: {
    question: `Do you like shows based around crime?`,
    yes: `I don't just like them, I law-ve them`,
    no: `I'd rather go to actual jail than watch a show involving it`,
  },

  isAnimated: {
    question: `Do you like animated shows?`,
    yes: `Ya, let me live life in 2D`,
    no: `No, give me real humans pls`,
  },

  isScary: {
    question: `Do you like shows with a bit of a scare? Note: Scary for Matt is a watered down version of scary for the average scary-TV-show-enjoyer`,
    yes: `Bet, spook me (but lightly)`,
    no: `No, I don't want any nightmares tonight`,
  },

  isOld: {
    question: `Is it ok if this TV show is old as dirt`,
    yes: `Of course, let me stroll down memory lane`,
    no: `No, the future is now!`
  }
})

export const shows: readonly IShow[] = [
  {
    name: `American Horror Story`,
    imageUrl: `https://img4.hulu.com/user/v3/artwork/a67a233c-fcfe-4e8e-b000-052603ddd616?base_image_bucket_name=image_manager&base_image=e5e77092-2ce7-4f5d-8371-f419a8ba95fb&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/american-horror-story-a67a233c-fcfe-4e8e-b000-052603ddd616`,
    endorsed: true,
    metadata: {
      isComedy: false,
      isWholesome: false,
      isNonfiction: false,
      isCrime: false,
      isAnimated: false,
      isScary: true,
      isOld: false,
    },
  },

  {
    name: `Fargo`,
    imageUrl: `https://img4.hulu.com/user/v3/artwork/203cda1b-7919-40fb-ab36-1e45b3ed2a50?base_image_bucket_name=image_manager&base_image=cf920804-5005-481c-8044-8b4755ae7174&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/fargo-203cda1b-7919-40fb-ab36-1e45b3ed2a50`,
    endorsed: true,
    metadata: {
      isComedy: false,
      isWholesome: false,
      isNonfiction: false,
      isCrime: true,
      isAnimated: false,
      isScary: false,
      isOld: false,
    },
  },

  {
    name: `Archer`,
    imageUrl: `https://img4.hulu.com/user/v3/artwork/22b4b3c8-0827-42d2-a841-50e8f3464dc2?base_image_bucket_name=image_manager&base_image=0ac0624e-f043-4cda-b232-07815ce9a8ab&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/archer-22b4b3c8-0827-42d2-a841-50e8f3464dc2`,
    endorsed: true,
    metadata: {
      isComedy: true,
      isWholesome: false,
      isNonfiction: false,
      isCrime: false,
      isAnimated: true,
      isScary: false,
      isOld: false,
    },
  },

  {
    name: `Dave`,
    imageUrl: `https://img.hulu.com/user/v3/artwork/ac3a96f0-9614-46af-b524-f59c7d281946?base_image_bucket_name=image_manager&base_image=f44f87dd-9eec-4536-a637-01d226972d0d&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/dave-ac3a96f0-9614-46af-b524-f59c7d281946`,
    endorsed: true,
    metadata: {
      isComedy: true,
      isWholesome: false,
      isNonfiction: false,
      isCrime: false,
      isAnimated: false,
      isScary: false,
      isOld: false,
    },
  },

  {
    name: `Rick & Morty`,
    imageUrl: `https://img4.hulu.com/user/v3/artwork/d76d6361-3fbf-4842-8dd7-e05520557280?base_image_bucket_name=image_manager&base_image=5a94e99c-9450-4ea6-8b37-84d008c4c631&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/rick-and-morty-d76d6361-3fbf-4842-8dd7-e05520557280`,
    endorsed: true,
    metadata: {
      isComedy: true,
      isWholesome: false,
      isNonfiction: false,
      isCrime: false,
      isAnimated: true,
      isScary: false,
      isOld: false,
    },
  },

  {
    name: `Bob's Burgers`,
    imageUrl: `https://img.hulu.com/user/v3/artwork/fdeb1018-4472-442f-ba94-fb087cdea069?base_image_bucket_name=image_manager&base_image=422b2dcd-a13e-4432-8bf6-520fdb56c15f&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/bobs-burgers-fdeb1018-4472-442f-ba94-fb087cdea069`,
    endorsed: true,
    metadata: {
      isComedy: true,
      isWholesome: true,
      isNonfiction: false,
      isCrime: false,
      isAnimated: true,
      isScary: false,
      isOld: false,
    },
  },

  {
    name: `Broad City`,
    imageUrl: `https://img3.hulu.com/user/v3/artwork/25fd484f-f2e1-43ff-a671-afd13d095690?base_image_bucket_name=image_manager&base_image=159c8853-a4b8-4af9-b68c-ea9a62458777&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/broad-city-25fd484f-f2e1-43ff-a671-afd13d095690`,
    endorsed: true,
    metadata: {
      isComedy: true,
      isWholesome: false,
      isNonfiction: false,
      isCrime: false,
      isAnimated: false,
      isScary: false,
      isOld: false,
    },
  },

  {
    name: `Brooklyn 99`,
    imageUrl: `https://img.hulu.com/user/v3/artwork/daf48b7a-6cd7-4ef6-b639-a4811ec95232?base_image_bucket_name=image_manager&base_image=fbf4bffe-52dd-4cc4-9d18-c0671cb09a8a&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/brooklyn-nine-nine-daf48b7a-6cd7-4ef6-b639-a4811ec95232`,
    endorsed: true,
    metadata: {
      isComedy: true,
      isWholesome: true,
      isNonfiction: false,
      isCrime: true,
      isAnimated: false,
      isScary: false,
      isOld: false,
    },
  },

  {
    name: `Lost`,
    imageUrl: `https://img.hulu.com/user/v3/artwork/466b3994-b574-44f1-88bc-63707507a6cb?base_image_bucket_name=image_manager&base_image=1120c8f5-127a-4751-a6af-fa5ffb25cda4&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/lost-466b3994-b574-44f1-88bc-63707507a6cb`,
    endorsed: false,
    metadata: {
      isComedy: false,
      isWholesome: false,
      isNonfiction: false,
      isCrime: false,
      isAnimated: false,
      isScary: false,
      isOld: true,
    }
  },

  {
    name: `Drunk History`,
    imageUrl: `https://img3.hulu.com/user/v3/artwork/b2c24686-450d-4634-a109-075def91cf11?base_image_bucket_name=image_manager&base_image=43e5adeb-1fd6-49ba-be21-7e842322da28&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/drunk-history-b2c24686-450d-4634-a109-075def91cf11`,
    endorsed: false,
    metadata: {
      isComedy: true,
      isWholesome: true,
      isNonfiction: true,
      isCrime: false,
      isAnimated: false,
      isScary: false,
      isOld: false,
    }
  },

  {
    name: `Hamilton's Pharmacopeia`,
    imageUrl: `https://img.hulu.com/user/v3/artwork/ba51f4e6-df48-4278-b75f-38f0d6ae6734?base_image_bucket_name=image_manager&base_image=5056ee03-7372-4754-9f98-e25adcc350ed&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/hamiltons-pharmacopeia-ba51f4e6-df48-4278-b75f-38f0d6ae6734`,
    endorsed: false,
    metadata: {
      isComedy: false,
      isWholesome: true,
      isNonfiction: true,
      isCrime: false,
      isAnimated: false,
      isScary: false,
      isOld: false,
    }
  },

  {
    name: `The Great`,
    imageUrl: `https://img.hulu.com/user/v3/artwork/238db0d4-c476-47ed-9bee-d326fd302f7d?base_image_bucket_name=image_manager&base_image=b5c5d299-75bc-4240-92ae-545df7725376&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/the-great-238db0d4-c476-47ed-9bee-d326fd302f7d`,
    endorsed: false,
    metadata: {
      isComedy: true,
      isWholesome: true,
      isNonfiction: true,
      isCrime: false,
      isAnimated: false,
      isScary: false,
      isOld: false,
    }
  },

  {
    name: `Catch 22`,
    imageUrl: `https://img2.hulu.com/user/v3/artwork/858b02a2-61de-4597-aaa0-7e3f12b54673?base_image_bucket_name=image_manager&base_image=6f332542-8e8b-412e-b976-d4bb40d55f48&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/catch-22-858b02a2-61de-4597-aaa0-7e3f12b54673`,
    endorsed: false,
    metadata: {
      isComedy: true,
      isWholesome: false,
      isNonfiction: false,
      isCrime: false,
      isAnimated: false,
      isScary: false,
      isOld: false,
    }
  },

  {
    name: `Wu-Tang: An American Saga`,
    imageUrl: `https://img.hulu.com/user/v3/artwork/8e4e1643-1254-4d6e-a567-d2c62f7b3e00?base_image_bucket_name=image_manager&base_image=803f9f08-66dd-46db-8309-6101e0e6b695&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/wu-tang-an-american-saga-8e4e1643-1254-4d6e-a567-d2c62f7b3e00`,
    endorsed: false,
    metadata: {
      isComedy: false,
      isWholesome: false,
      isNonfiction: true,
      isCrime: false,
      isAnimated: false,
      isScary: false,
      isOld: false,
    }
  },

  {
    name: `Nathan for You`,
    imageUrl: `https://img.hulu.com/user/v3/artwork/1841713d-d10b-4582-bfaa-286d746fa83a?base_image_bucket_name=image_manager&base_image=b8eeda4d-60b0-4072-812d-64d60f9eac1d&operations=%5B%7B%22resize%22:%22200x200%7Cmax%22%7D,%7B%22format%22:%22jpeg%22%7D%5D`,
    url: `https://www.hulu.com/series/nathan-for-you-1841713d-d10b-4582-bfaa-286d746fa83a`,
    endorsed: true,
    metadata: {
      isComedy: true,
      isWholesome: true,
      isNonfiction: true,
      isCrime: false,
      isAnimated: false,
      isScary: false,
      isOld: false,
    }
  },
]