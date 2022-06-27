import Button from '../components/UI/Button';
import Image from 'next/Image';
import {NextPage} from 'next';
import background from '../public/images/backGround.png';
import classes from '../styles/Home.module.css';
import {useRouter} from "next/router";

const HomePage:NextPage = () =>{
    const router = useRouter();
    const onRegistrarmeClickHandler = () =>{
        router.push('/register');
    }
    return(
        <main className={classes.container}>
            <section id='landingId' className={classes.landingContainer}>
                <Image className={classes.backGroundImage} 
                src={background} 
                alt="Background"
                priority={true} 
                layout='responsive' />
                <div id="landingLegend" className={classes.landingLegend}>
                    <h2>Qué es LoyaltyAPP ?</h2>
                    {/* <ul>
                        <li><h5>Es una APP que creas en línea </h5></li>
                        <li><h5>La personalizas a la marca de tu Universidad </h5></li>
                        <li><h5>Optimíza tu presupuesto de Marketing Digital </h5></li>
                        <li><h5>Tus alumnos (promotores digitales) ganan por nuevos matriculados </h5></li>
                    </ul> */}
                    <p className={'body1'}>Imaginate poder crear tu propia APP de Marketing Digital en línea en simples pasos, personalizada
                        a la marca de tu Universidad.
                    </p>
                    <p className={'body1'}>
                        Esta APP permite a tus principales Testimonios (tus alumnos) compartir beneficios únicos con su entorno y poder ganar a la vez
                        con las nuevas matriculaciones que cada uno genere.
                    </p>
                    <p className={'body1'}>
                        Si ya lo estas vizualizando, hacé click en Registrarme y comenzá a hacerlo realidad.
                    </p>
                    <p className={'body1'}>
                        Lo mejor de todo es que LoyaltyAPP solo te cobra por resultados reales, ya no más cobros por vistas, 
                        por interacción, solamente matriculaciones.
                    </p>
                    <div className={classes.registerButtonContainer}>
                        <Button label={"Registrarme"} isAvailable={true} 
                        onClickHandler={onRegistrarmeClickHandler}
                        additionalStyle={{backgroundColor:"var(--primary-color)", 
                                        color:"var(--on-primary-text-color)",
                                        padding:"0px 30px 0px 30px"}}/>
                    </div>
                    
                </div>
               
            </section>
        </main>
    )
}
export default HomePage;