import { secondsToMinutes } from "../utils/second-to-minutes";

type Props = {
  mainTime: number;
};

export const Timer = ({ mainTime }: Props) => {
  return <div className='timer'>{secondsToMinutes(mainTime)}</div>;
};
