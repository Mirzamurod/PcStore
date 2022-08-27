import Pcs from './../../Components/Pcs/Pcs'
import Slider from './../../Components/Slider/Slider'
import Brends from './../../Components/Brends/Brends'

const HomePage = () => {
    document.title = 'Pc Store'

    return (
        <div>
            <div id='home'>
                <Slider />
                <Brends />
            </div>
            <Pcs />
        </div>
    )
}

export default HomePage
