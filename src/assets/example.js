// Matter module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint;

// create a Matter.js engine
var engine = Engine.create(document.body, {
  render: {
    options: {
      wireframes: false,
      background: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-bk2.jpg'
    }
  }
});

// add a mouse controlled constraint
var mouseConstraint = MouseConstraint.create(engine);
World.add(engine.world, mouseConstraint);

// some settings
var offset = 30,
    wallOptions = { 
      isStatic: true
    };

// add some invisible some walls to the world
World.add(engine.world, [
  Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, wallOptions),
  Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, wallOptions),
  Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, wallOptions),
  Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, wallOptions)
]);

//create a stack
var stack = Composites.stack(6, 6, 12, 4, 0, 0, function(x, y, column, row) {
  
 if (Math.random() > 0.5) {
    return Bodies.rectangle(x, y, 64, 64, {
      render: {
        sprite: {
          texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/box-grape-blue.png'
        }
      }
    });
  } else if (Math.random() > 0.9) {
    return Bodies.rectangle(x, y, 64, 64, {
      render: {
        sprite: {
          texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/box-grape-red.png'
        }
      }
    });
  } else if  (Math.random() > 0.7) {
    return Bodies.circle(x, y, 46, {
      density: 0.0005,
      frictionAir: 0.06,
      restitution: 0.3,
      friction: 0.06,
      render: {
        sprite: {
          texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-grape-green.png'
        }
      }
    });
  } else {
    return Bodies.circle(x, y, 46, {
      density: 0.0005,
      frictionAir: 0.06,
      restitution: 0.3,
      friction: 0.06,
      render: {
        sprite: {
          texture: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ball-grape.png'
        }
      }
    });
  }
});

// add the stack to the world
World.add(engine.world, stack);

// run the engine
Engine.run(engine);