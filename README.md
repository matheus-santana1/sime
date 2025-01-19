# SIME - Sistema Inteligente De Monitoramento De Enchentes

Projeto realizado para apresentação do TCC no IFMG Campus Itabirito. Trata-se de um sistema de monitoramento de enchentes no qual se utiliza um ESP32 juntamente com um sensor ultrassônico. Foi desenvolvido um app para realizar o supervisório do sistema. https://www.youtube.com/shorts/xC3y7GinPuE


## Tecnologias utilizadas
- React Native
- Expo
- Websocket para comunicação
- Codigo c++ para ESP32
- Zustand (tornar o websocket acessivel em todo o app)

## Funcionamento
ESP32 será um ponto de acesso wifi com uma rede denominada SIME (senha: testpassword). Ao abrir o aplicativo ele se conecta ao ESP32 e passa a receber informações do sensor.


![app](https://github.com/matheus-santana1/sime/blob/main/assets/app_image.PNG?raw=true)
![maquete](https://github.com/matheus-santana1/sime/blob/main/assets/simeville.png?raw=true)
