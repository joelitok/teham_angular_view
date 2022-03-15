import {  ReplaySubject, Subscription } from 'rxjs';

interface TehamViewData {
  name: string
  data: any
}

interface TehamResponse {
  host: string
  port: string
  topic: string
  url: string
}

export class TehamLib {

  private url: string = '';
  private subject: ReplaySubject<TehamViewData>;

  private static webSocket: WebSocket;

  constructor() {
    this.subject = new ReplaySubject();
  }

  connect(url: string, xmlFileName: string) {
    console.log("Fetching WebSocket information...");
    return fetch(`${url}?xml_file_name=${xmlFileName}`, { method: 'POST'})
      .then<TehamResponse>(res => res.json()).then(tehamRes => {
        this.url = tehamRes.url;
        this.webSocketConnect();
      });
  };

  disconnect() {
    if (TehamLib.webSocket != null) {
      TehamLib.webSocket.close();
      console.log("Disconnected");
    }
  }

  subscribe(observer?: (_:TehamViewData) => void) {
    if (observer) {
      return this.subject.subscribe(data => {
        observer(data);
      });
    }
    return null;
  }

  static send(name: string, data: any) {
    if (TehamLib.webSocket != null) {
      const jsonStr = JSON.stringify({name, data});
      console.log('Donnees envoye au serveur', jsonStr);
      TehamLib.webSocket.send(jsonStr);
    }
  }

  private webSocketConnect = () => {
    TehamLib.webSocket = new WebSocket(this.url);

    // La connexion est ouverte
    TehamLib.webSocket.addEventListener('open', function (event) {
        console.log('Connected to websocket', event);
    });

    // Écouter les messages
    TehamLib.webSocket.addEventListener('message', (event) => {
        console.log('Voici un message du serveur', event);
        this.subject.next(JSON.parse((event as any).data));
    });
  }

}