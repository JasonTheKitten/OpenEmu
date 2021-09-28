precision mediump float;

uniform sampler2D texture;
varying vec2 pipedShape;

uniform vec3 foreground;
uniform vec3 background;


void main() {
   gl_FragColor = texture2D(texture, pipedShape);
   if(gl_FragColor.a == 0.0) {
      gl_FragColor = vec4(background, 1.0);
   } else {
      gl_FragColor = vec4(foreground, 1.0);
   }
}