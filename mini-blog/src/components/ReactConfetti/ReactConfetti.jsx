import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const ReactConfetti = () => {
    const { width, height } = useWindowSize();
    return (
        <div>
            <Confetti width={width} height={height} recycle={false} />
        </div>
    );
};

export default ReactConfetti;
