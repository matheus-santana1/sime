import { create } from 'zustand';
import { produce } from 'immer';
import { createRef, RefObject } from 'react';
import { ChartHandle } from '../app/application/components/Graph';
import DEFAULT_OPTION from 'app/application/components/Graph/options';

let xLabel = 'Horas';
let yLabel = 'Metros';
let initialDataY = [26, 14, 7, 11, 28, 5, 22];
let initialDataX = ['15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];

export interface MessagePayload {
  conectado?: boolean;
  prevNiveis?: number[];
  nivel?: number;
  acao?: 'play' | 'pause';
}
type SendJsonMessage = (jsonMessage: MessagePayload, keep?: boolean) => void;

export type SystemState = {
  chartOptions: any;
  chartRef: RefObject<ChartHandle> | null;
  defaultUrl: string | (() => string | Promise<string>) | null;
  url: string | (() => string | Promise<string>) | null;
  conectado: boolean;
  conectando: boolean;
  isPlaying: boolean;
  nivelAtual: number;
  horaAtual: string;
  sendMessage: SendJsonMessage;
  conectar: () => void;
  desconectar: () => void;
  setSystem: (value: {
    conectado?: boolean;
    defaultUrl?: string | (() => string | Promise<string>) | null;
    sendMessage?: SendJsonMessage;
    isPlaying?: boolean;
    chartOptions?: any;
    prevNiveis?: any;
    nivelAtual?: number;
    horaAtual?: string;
  }) => void;
};

export const useSystem = create<SystemState>((set, get) => ({
  chartOptions: DEFAULT_OPTION({ xLabel, yLabel, initialDataY, initialDataX }),
  chartRef: createRef<ChartHandle>(),
  defaultUrl: null,
  url: null,
  conectado: false,
  conectando: false,
  isPlaying: false,
  nivelAtual: 0,
  horaAtual: '0',
  sendMessage: () => {},
  conectar: () => {
    const { defaultUrl } = get();
    set({ url: defaultUrl, conectando: true });
  },
  desconectar: () => {
    set({ url: null, conectado: false, isPlaying: false, conectando: false });
  },
  setSystem: (value) => {
    if ('conectado' in value) {
      set({ conectado: value.conectado, conectando: false });
    }
    if ('defaultUrl' in value) {
      set({ defaultUrl: value.defaultUrl });
    }
    if ('sendMessage' in value) {
      set({ sendMessage: value.sendMessage });
    }
    if ('isPlaying' in value) {
      const { sendMessage, conectado } = get();
      set({ isPlaying: value.isPlaying });
      if (conectado) {
        sendMessage({ acao: value.isPlaying ? 'play' : 'pause' });
      }
    }
    if ('chartOptions' in value) {
      set({ chartOptions: value.chartOptions });
    }
    if ('prevNiveis' in value) {
      const { chartOptions, chartRef } = get();
      const updated = produce(chartOptions, (draft: any) => {
        draft.xAxis[0].data = value.prevNiveis.xAxis[0].data;
        draft.series[0].data = value.prevNiveis.series[0].data;
      });
      set({ chartOptions: updated });
      chartRef?.current?.updateOptions(updated);
    }
    if ('nivelAtual' in value) {
      set({ nivelAtual: value.nivelAtual });
    }
    if ('horaAtual' in value) {
      set({ horaAtual: value.horaAtual });
    }
  },
}));
