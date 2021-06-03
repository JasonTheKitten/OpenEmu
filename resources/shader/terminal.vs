attribute vec4 shape;
attribute vec2 shape2;
varying vec2 pipedShape;

void main() {
   gl_Position = shape;
   pipedShape = shape2;
}