import Slider from './Slider'
import Brends from './Brends'
import { Pcs } from '../../Components'

document.title = 'Pc Store'

const HomePage = () => (
    <div>
        <div id='home'>
            <Slider />
            <Brends />
        </div>
        <Pcs />
    </div>
)

export default HomePage
