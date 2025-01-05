import rio_1 from '../../assets/rio_1.png';
import rio_2 from '../../assets/rio_2.png';

export interface SlideItem {
  title: string;
  image: any;
  text: string;
  button_text: string;
  disable_button?: boolean;
  urlWebsocket?: string;
}

const slides = [
  {
    key: '1',
    title: 'RIO DE SIMEVILLE',
    text: 'Simeville, uma pequena cidade, cortada por um rio que atravessa suas áreas residenciais e comerciais, tem enfrentado problemas de alagamento devido às mudanças climáticas. Para ajudar a prevenir esses transtornos, a empresa FLP Automação desenvolveu o aplicativo SIME, que monitora o nível do rio através de um circuito eletrônico, alertando para possíveis enchentes.',
    image: rio_2,
    button_text: 'Selecionar',
    urlWebsocket: '192.168.4.1:8080',
  },
  {
    key: '2',
    title: 'RIO ITABIRITO',
    text: 'O Rio Itabirito, situado em Minas Gerais, é um importante afluente do Rio São Francisco. Com suas águas cristalinas e paisagens deslumbrantes, o Itabirito é uma atração para os amantes da natureza e do ecoturismo. Sua bacia hidrográfica abriga uma rica biodiversidade, incluindo diversas espécies de fauna e flora nativas.',
    image: rio_1,
    button_text: 'Em breve...',
    disable_button: true,
  },
];

export default slides;
