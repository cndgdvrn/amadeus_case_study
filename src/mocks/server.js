import { setupWorker } from "msw";
import { handlers } from "./handlers";

const worker = setupWorker(
  ...handlers
);


export const start = () => worker.start()