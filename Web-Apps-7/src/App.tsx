import './App.scss'
import Gallery from "./components/Gallery/Gallery.tsx";



export default function App() {
    return (
            <>
                <div className="box">
                    <h1>Hello World</h1>
                </div>

                <br/>

                <div className="gallery">
                    <Gallery />
                </div>
            </>
        )

}
