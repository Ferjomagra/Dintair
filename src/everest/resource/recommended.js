exports.getItem = (search) => {
    var item = {};
    item['A todos los rubros']=[
      'Actividades Deportivas y Fitness',
      'Alimentos y Bebidas',
      'Arte, Cultura y Creatividad',
      'Diseño, Construcción e Ingeniería',
      'Fotografía y Audiovisuales',
      'Maquinaria, Equipo y Tecnología',
      'Medios, Entretenimiento y Publicaciones',
      'Productos de Belleza',
      'Ropa, Moda y Accesorios',
      'Servicios logísticos',
      'Servicios de marketing / agencia',
      'Tecnología de Información y Comunicaciones',
      'Tienda de Alimentos Naturales y Orgánicos'
    ];
    item['Actividades Deportivas y Fitness'] = [
        'Actividades Deportivas y Fitness'
    ];


    item['Alimentos y Bebidas'] = [
        'Alimentos y Bebidas'
    ];

    item['Arte, Cultura y Creatividad'] = [
        'Arte, Cultura y Creatividad',
        'Fotografía y Audiovisuales',
        'Medios, Entretenimiento y Publicaciones',
        'Tecnología de Información y Comunicaciones',
        'Tienda de Alimentos Naturales y Orgánicos'
    ];

    item['Diseño, Construcción e Ingeniería'] = [
        'Diseño, Construcción e Ingeniería',
        'Alimentos y Bebidas',
        'Medios, Entretenimiento y Publicaciones',
        'Tienda de Alimentos Naturales y Orgánicos'
    ];

    item['Fotografía y Audiovisuales'] = [
        'Fotografía y Audiovisuales',
        'Actividades Deportivas y Fitness',
        'Arte, Cultura y Creatividad',
        'Medios, Entretenimiento y Publicaciones',
        'Ropa, Moda y Accesorios'
    ];

    item['Maquinaria, Equipo y Tecnología'] = [
        'Maquinaria, Equipo y Tecnología'
    ];

    item['Medios, Entretenimiento y Publicaciones'] = [
        'Medios, Entretenimiento y Publicaciones',
        'Actividades Deportivas y Fitness',
        'Arte, Cultura y Creatividad',
        'Productos de Belleza',
        'Ropa, Moda y Accesorios',
        'Servicios de marketing / agencia'
    ];


    item['Productos de Belleza'] = [
        'Productos de Belleza',
        'Actividades Deportivas y Fitness',
        'Arte, Cultura y Creatividad',
        'Fotografía y Audiovisuales',
        'Ropa, Moda y Accesorios',
        'Servicios de marketing / agencia',
        'Tienda de Alimentos Naturales y Orgánicos'
    ];

    item['Ropa, Moda y Accesorios'] = [
        'Ropa, Moda y Accesorios',
        'Actividades Deportivas y Fitness',
        'Arte, Cultura y Creatividad',
        'Fotografía y Audiovisuales',
        'Productos de Belleza'
    ];

    item['Servicios logísticos'] = [
        'Servicios logísticos',
        'Servicios de marketing / agencia'
    ];

    item['Servicios de marketing / agencia'] = [
        'Servicios de marketing / agencia',
        'Actividades Deportivas y Fitness',
        'Fotografía y Audiovisuales'
    ];

    item['Tecnología de Información y Comunicaciones'] = [
        'Tecnología de Información y Comunicaciones',
        'Servicios de marketing / agencia'
    ];

    item['Tienda de Alimentos Naturales y Orgánicos'] = [
        'Tienda de Alimentos Naturales y Orgánicos'
    ];

    return item[search];
};