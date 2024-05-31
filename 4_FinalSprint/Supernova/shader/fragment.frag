precision mediump float;

varying vec3 vNormal;

void main() {
    // Original normal-based color
    vec3 normalColor = vNormal * 0.5 + 0.5;

    // Pink color
    vec3 pink = vec3(1.0, 0.2, 0.6);

    // Blend the normal color with pink
    vec3 color = mix(normalColor, pink, 0.7); // Adjust the blending factor as needed

    // Set the fragment color
    gl_FragColor = vec4(color, 0.7);
}
