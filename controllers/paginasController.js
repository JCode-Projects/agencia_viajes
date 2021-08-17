import { Viaje } from '../models/Viajes.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 })) ;
    promiseDB.push(Testimonial.findAll({ limit: 3 }))

    try {
        // Get 3 Viajes
        const resultado = await Promise.all(promiseDB);


        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });   
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    // Get all viajes
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    
    try {
        const detalles = await Viaje.findOne({ where: { slug }});
        console.log(detalles);
        res.render('viaje', {
            pagina: detalles.titulo,
            detalles
        })
    } catch (error) {
        console.log(error)
    }
}

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll();
        
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaDetalleViaje,
    paginaTestimoniales
}