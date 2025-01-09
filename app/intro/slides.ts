import rio_1 from '../../assets/rio_1.png';
import rio_2 from '../../assets/rio_2.png';

export interface MapaItem {
  name: string;
  id: number;
  nameIcon: string;
  positionPin: {
    x: number;
    y: number;
  }[];
}

export interface SlideItem {
  title: string;
  image: any;
  text: string;
  button_text: string;
  disable_button?: boolean;
  urlWebsocket?: string;
  mapa?: MapaItem[] | {};
  key?: string;
}

const slides: SlideItem[] = [
  {
    key: '1',
    title: 'RIO DE SIMEVILLE',
    text: 'Simeville, uma pequena cidade, cortada por um rio que atravessa suas áreas residenciais e comerciais, tem enfrentado problemas de alagamento devido às mudanças climáticas. Para ajudar a prevenir esses transtornos, a empresa FLP Automação desenvolveu o aplicativo SIME, que monitora o nível do rio através de um circuito eletrônico, alertando para possíveis enchentes.',
    image: rio_2,
    button_text: 'Selecionar',
    urlWebsocket: '192.168.4.1:8080',
    //urlWebsocket: '192.168.0.13:8080',
    mapa: [
      {
        name: 'Rio Simeville',
        nameIcon: 'river',
        id: 1,
        positionPin: [
          {
            x: 1500,
            y: 1500,
          },
        ],
      },
      {
        name: 'Prefeitura',
        nameIcon: 'cityhall',
        id: 2,
        positionPin: [
          {
            x: 2000,
            y: 800,
          },
        ],
      },
      {
        name: 'Pontos seguros',
        nameIcon: 'secure',
        id: 3,
        positionPin: [
          {
            x: 2000,
            y: 100,
          },
          {
            x: 1000,
            y: 3600,
          },
        ],
      },
    ],
  },
  {
    key: '2',
    title: 'RIO ITABIRITO',
    text: 'O Rio Itabirito, situado em Minas Gerais, é um importante afluente do Rio São Francisco. Com suas águas cristalinas e paisagens deslumbrantes, o Itabirito é uma atração para os amantes da natureza e do ecoturismo. Sua bacia hidrográfica abriga uma rica biodiversidade, incluindo diversas espécies de fauna e flora nativas.',
    image: rio_1,
    button_text: 'Em breve...',
    disable_button: true,
    mapa: {},
  },
];

export default slides;
