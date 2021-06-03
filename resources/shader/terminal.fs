precision mediump float;

uniform sampler2D texture;
varying vec2 pipedShape;


void main() {
   gl_FragColor = texture2D(texture, pipedShape);
   if(gl_FragColor.a == 0.0) discard;
}