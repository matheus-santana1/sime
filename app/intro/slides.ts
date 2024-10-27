import rio_1 from '../../assets/rio_1.png';
import rio_2 from '../../assets/rio_2.png';

export interface SlideItem {
  title: string;
  image: any;
  text: string;
}

export const slides = [
  {
    key: '1',
    title: 'RIO ITABIRITO',
    text: 'O Rio Itabirito, situado em Minas Gerais, é um importante afluente do Rio São Francisco. Com suas águas cristalinas e paisagens deslumbrantes, o Itabirito é uma atração para os amantes da natureza e do ecoturismo. Sua bacia hidrográfica abriga uma rica biodiversidade, incluindo diversas espécies de fauna e flora nativas.',
    image: rio_1,
  },
  {
    key: '2',
    title: 'RIO SÃO FRANCISCO',
    text: 'O Rio São Francisco, conhecido como "Velho Chico", é um dos mais icônicos do Brasil, percorrendo mais de 3.000 km e atravessando cinco estados. Ele é uma fonte essencial de água, energia e transporte, além de ser vital para a agricultura e a pesca na região.',
    image: rio_2,
  },
];
