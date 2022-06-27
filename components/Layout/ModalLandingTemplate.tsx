import ImageCard, { imageToShow } from './ImageCard';

import Button from '../UI/Button';
import { Fragment } from 'react';
import Image from 'next/Image';
import Portal from './Portal';
import classes from './ModalLandingTemplate.module.css';

const section1_images = [
    {url:'/ucsa/image1-Section1-14-4-2022-1652573568771.jpeg',alt:'Foto de ..'},
    {url:'/ucsa/image1-Section1-14-4-2022-1652575491990.jpeg',alt:'Foto de ..'},
    {url:'/ucsa/image2-Section1-14-4-2022-1652573784510.jpeg', alt:'Foto de ..'}


]
const section2_images = [
    {url:'/ucsa/image1-Section1-14-4-2022-1652573568771.jpeg',alt:'Foto de ..'},
    {url:'/ucsa/image1-Section1-14-4-2022-1652575491990.jpeg',alt:'Foto de ..'},
    {url:'/ucsa/image2-Section1-14-4-2022-1652573784510.jpeg', alt:'Foto de ..'}


]
const section3_images = [
    {url:'/ucsa/image1-Section1-14-4-2022-1652573568771.jpeg',alt:'Foto de ..'},
    {url:'/ucsa/image1-Section1-14-4-2022-1652575491990.jpeg',alt:'Foto de ..'},
    {url:'/ucsa/image2-Section1-14-4-2022-1652573784510.jpeg', alt:'Foto de ..'}


]

export interface LandingTemplateProps{
    
    numberOfSections?:number;
    section1_id?:number;
    section1_title?:string;
    section1_imagesLength?:number;
    section1_images?:imageToShow[];
    section2_title?:string;
    section3_title?:string;
    section3_oneTextOnly?:boolean;
    
}

const ModalLandingTemplate = (props:LandingTemplateProps) =>{
    
    return(
         <Portal>
            <div className={classes.ModalOverlay}>
                <section className={classes.ImageContainer}>
                    <img className={classes.ImageBackGround} src={'/ucsa/benefitImage-3-4-2022-1651607327724.jpeg'}></img>
                </section>
                <section className={classes.BenefitSection}>
                    <div className={classes.UniversityTitle}>
                        <h2 className={classes.UniversityTitleText}>Beneficios Digitales Universidad del Cono Sur de las Americas</h2>
                    </div>
                    <h1>Beneficio exclusivo para Juan Gonzalez</h1>
                    <h2>a través de Javier Perez</h2>
                    <div className={classes.benefitTitleContainer}>
                        <h1 className={classes.benefitTitle}>Gs. 1.000.000 de bono en tu matriculación</h1>
                        <p>Con este beneficio tenés un descuento de 1.000.000Gs en tu matricula</p>
                        <button className={classes['btn-grad']}>Quiero que me contacten</button>
                        <p>Este beneficio es personal e intransferible y es valido hasta el 30/05/2022</p>
                    </div>
                </section>
                {props.section1_title && <section className={classes.Section1Container}>
                    <h1 className={classes.Section1Title}>Sobre Nosotros</h1>
                    <ImageCard images={section1_images} />
                    <p>El origen de la Universidad del Cono Sur de las Américas, UCSA, 
                        se remonta y fundamenta en la Escuela de Administración de Negocios, EDAN, 
                        que fue creada en 1990 por gremios empresariales, empresarios y académicos interesados 
                        en el mejoramiento de la productividad de las empresas paraguayas gracias a la 
                        calificación profesional de sus cuadros dirigenciales superiores y medios, 
                        en la firme creencia de que solo por la vía de una mayor capacidad para generar 
                        riquezas por parte del aparato productivo, sería posible mejorar la calidad de vida 
                        para todos los habitantes del país. Por ello, su lema fundamental, que al mismo tiempo 
                        resume lo esencial de su filosofía, expresa “Para servir al país mediante las empresas</p>
                </section>}
                {props.section2_title && <section className={classes.Section2Container}>
                    <h1 className={classes.Section1Title}>Sobre La Carrera</h1>
                    <ImageCard images={section2_images} />
                    <p>El origen de la Universidad del Cono Sur de las Américas, UCSA, 
                        se remonta y fundamenta en la Escuela de Administración de Negocios, EDAN, 
                        que fue creada en 1990 por gremios empresariales, empresarios y académicos interesados 
                        en el mejoramiento de la productividad de las empresas paraguayas gracias a la 
                        calificación profesional de sus cuadros dirigenciales superiores y medios, 
                        en la firme creencia de que solo por la vía de una mayor capacidad para generar 
                        riquezas por parte del aparato productivo, sería posible mejorar la calidad de vida 
                        para todos los habitantes del país. Por ello, su lema fundamental, que al mismo tiempo 
                        resume lo esencial de su filosofía, expresa “Para servir al país mediante las empresas</p>
                </section>}
                {props.section3_title && <section className={classes.Section3Container}>
                <h1 className={classes.Section1Title}>Testimonios</h1>
                    {props.section3_oneTextOnly &&
                        <Fragment>
                        <ImageCard images={section3_images} />
                        <p>El origen de la Universidad del Cono Sur de las Américas, UCSA, 
                            se remonta y fundamenta en la Escuela de Administración de Negocios, EDAN, 
                            que fue creada en 1990 por gremios empresariales, empresarios y académicos interesados 
                            en el mejoramiento de la productividad de las empresas paraguayas gracias a la 
                            calificación profesional de sus cuadros dirigenciales superiores y medios, 
                            en la firme creencia de que solo por la vía de una mayor capacidad para generar 
                            riquezas por parte del aparato productivo, sería posible mejorar la calidad de vida 
                            para todos los habitantes del país. Por ello, su lema fundamental, que al mismo tiempo 
                            resume lo esencial de su filosofía, expresa “Para servir al país mediante las empresas
                        </p>
                        </Fragment>
                    }
                    {!props.section3_oneTextOnly && 
                    <Fragment>
                        <ImageCard image={section3_images[0]} />
                        <p>El origen de la Universidad del Cono Sur de las Américas, UCSA, 
                        se remonta y fundamenta en la Escuela de Administración de Negocios, EDAN, 
                        que fue creada en 1990 por gremios empresariales, empresarios y académicos interesados 
                        en el mejoramiento de la productividad de las empresas paraguayas gracias a la 
                        calificación profesional de sus cuadros dirigenciales superiores y medios, 
                        en la firme creencia de que solo por la vía de una mayor capacidad para generar 
                        riquezas por parte del aparato productivo, sería posible mejorar la calidad de vida 
                        para todos los habitantes del país. Por ello, su lema fundamental, que al mismo tiempo 
                        resume lo esencial de su filosofía, expresa “Para servir al país mediante las empresas
                        </p>
                        <ImageCard image={section3_images[1]} />
                        <p>El origen de la Universidad del Cono Sur de las Américas, UCSA, 
                        se remonta y fundamenta en la Escuela de Administración de Negocios, EDAN, 
                        que fue creada en 1990 por gremios empresariales, empresarios y académicos interesados 
                        en el mejoramiento de la productividad de las empresas paraguayas gracias a la 
                        calificación profesional de sus cuadros dirigenciales superiores y medios, 
                        en la firme creencia de que solo por la vía de una mayor capacidad para generar 
                        riquezas por parte del aparato productivo, sería posible mejorar la calidad de vida 
                        para todos los habitantes del país. Por ello, su lema fundamental, que al mismo tiempo 
                        resume lo esencial de su filosofía, expresa “Para servir al país mediante las empresas
                        </p>
                        <ImageCard image={section3_images[2]} />
                        <p>El origen de la Universidad del Cono Sur de las Américas, UCSA, 
                        se remonta y fundamenta en la Escuela de Administración de Negocios, EDAN, 
                        que fue creada en 1990 por gremios empresariales, empresarios y académicos interesados 
                        en el mejoramiento de la productividad de las empresas paraguayas gracias a la 
                        calificación profesional de sus cuadros dirigenciales superiores y medios, 
                        en la firme creencia de que solo por la vía de una mayor capacidad para generar 
                        riquezas por parte del aparato productivo, sería posible mejorar la calidad de vida 
                        para todos los habitantes del país. Por ello, su lema fundamental, que al mismo tiempo 
                        resume lo esencial de su filosofía, expresa “Para servir al país mediante las empresas
                        </p>
                        <ImageCard image={section3_images[0]} />
                        <p>El origen de la Universidad del Cono Sur de las Américas, UCSA, 
                        se remonta y fundamenta en la Escuela de Administración de Negocios, EDAN, 
                        que fue creada en 1990 por gremios empresariales, empresarios y académicos interesados 
                        en el mejoramiento de la productividad de las empresas paraguayas gracias a la 
                        calificación profesional de sus cuadros dirigenciales superiores y medios, 
                        en la firme creencia de que solo por la vía de una mayor capacidad para generar 
                        riquezas por parte del aparato productivo, sería posible mejorar la calidad de vida 
                        para todos los habitantes del país. Por ello, su lema fundamental, que al mismo tiempo 
                        resume lo esencial de su filosofía, expresa “Para servir al país mediante las empresas
                        </p>
                    </Fragment>}
                </section>}
                
            </div>
         </Portal>
    )

}

export default ModalLandingTemplate;