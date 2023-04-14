import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IncomingMessages, SentMessages } from "./events";
import Logger from "js-logger";

interface IParameters {
  send: {
    name: SentMessages;
    cb: any;
  };
  recieve: {
    name: IncomingMessages;
    cb: any;
  };
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

export const eventFactory = ({send, recieve, socket}: IParameters) => {
  const init = () => {
    socket.on(send.name, (data: any) => {
      Logger.debug(send.name, data);
      send.cb(data);
    });
  }
  const destroy = () => {
    Logger.debug('socket disconnected');
    socket.disconnect();
  }

  return {
    init,
    destroy,
  }
}