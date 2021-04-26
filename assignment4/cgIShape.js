//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//
function makeCube (subdivisions)  {
    if( subdivisions < 1 )
        subdivisions = 1;
	var step = (1 / subdivisions);
	for (i = 0; i < subdivisions; i++) {	
		u0 = i * step - .5;
		u1 = (i + 1) * step - .5;
		for (j = 0; j < subdivisions; j++) {
			v0 = j * step - .5;
			v1 = (j + 1) * step - .5;
			addTriangle(u1, v0, -.5, u0, v0, -.5, u0, v1, -.5);
			addTriangle(u1, v0, -.5, u0, v1, -.5, u1, v1, -.5);
			addTriangle(u0, v0, .5, u1, v0, .5, u0, v1, .5);
			addTriangle(u0, v1, .5, u1, v0, .5, u1, v1, .5);
			addTriangle(-.5, u0, v1, -.5, u1, v0, -.5, u0, v0);
			addTriangle(-.5, u1, v1, -.5, u1, v0, -.5, u0, v1);
			addTriangle(.5, u1, v0, .5, u0, v1, .5, u0, v0);
			addTriangle(.5, u1, v0, .5, u1, v1, .5, u0, v1);
			addTriangle(u1, -.5, v0, u0, -.5, v1, u0, -.5, v0);
			addTriangle(u1, -.5, v0, u1, -.5, v1, u0, -.5, v1);
			addTriangle(u0, .5, v1, u1, .5, v0, u0, .5, v0);
			addTriangle(u1, .5, v1, u1, .5, v0, u0, .5, v1);
		}
	}
}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision){
    if( radialdivision < 3 )
        radialdivision = 3;
    if( heightdivision < 1 )
        heightdivision = 1;
	pi = 3.14159265358979;
	alpha = 0;
	for (i = 0; i < radialdivision; i++) {
		x0 = 0.5 * Math.cos(i * 2 * pi / radialdivision);
		z0 = 0.5 * Math.sin(i * 2 * pi / radialdivision);
		x1 = 0.5 * Math.cos((i+1) * 2 * pi / radialdivision);
		z1 = 0.5 * Math.sin((i+1) * 2 * pi / (radialdivision));
		addTriangle(0., -.5, 0, x0, -.5, z0, x1, -.5, z1);
		addTriangle(x1, .5, z1, x0, .5, z0, 0, .5, 0);
		for (j = 0; j < heightdivision; j++) {
			y0 = j / heightdivision-.5;
			y1 = (j + 1) / heightdivision-.5;
			addTriangle(x0, y1, z0, x1, y1, z1, x0, y0, z0);
			addTriangle(x1, y1, z1, x1, y0, z1, x0, y0, z0);
		}
	}
}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {
    if( radialdivision < 3 )
        radialdivision = 3;
    if( heightdivision < 1 )
        heightdivision = 1;
    pi = 3.14159265358979;
    for (i = 0; i < radialdivision; i++) {
        x0 = 0.5 * Math.cos(i * 2 * pi / radialdivision);
        z0 = 0.5 * Math.sin(i * 2 * pi / radialdivision);
        x1 = 0.5 * Math.cos((i + 1) * 2 * pi / radialdivision);
        z1 = 0.5 * Math.sin((i + 1) * 2 * pi / radialdivision);
        addTriangle(x0, -0.5, z0, x1, -0.5, z1, 0.0, -0.5, 0.0);
        y0 = -0.5;
        cx0 = -x0 / heightdivision;
        cz0 = -z0 / heightdivision;
        cx1 = -x1 / heightdivision;
        cz1 = -z1 / heightdivision;
        y1 = 1.0 / heightdivision;
        for (j = 0; j < heightdivision - 1; j++) {
            addTriangle(x0, y0, z0, x0+cx0, y0+y1, z0+cz0, x1, y0, z1);
            addTriangle(x0+cx0, y0+y1, z0+cz0, x1+cx1, y0+y1, z1+cz1, x1, y0, z1);
            x0 += cx0;
            z0 += cz0;
            x1 += cx1;
            z1 += cz1;
            y0 += y1;
        }
        addTriangle(x0, y0, z0, 0.0, 0.5, 0.0, x1, y0, z1);
    }
}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {

    var current_triangle;
    var point2, point3, point4, phi;
    var triangles = [];
    var r = 0.5;
    var long = radians(360/slices);
    var lat = radians(180/stacks);
    var point2, point3, point4;
    var theta = 0.0;
    for (var i=0; i<slices; i++){
        phi = 0.0;
        for(var j=0; j<stacks; j++){
            point2 = [r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi), r * Math.cos(theta) * Math.sin(phi)];
            point3 = [r * Math.sin(theta + long) * Math.sin(phi), r * Math.cos(phi), r * Math.cos(theta + long) * Math.sin(phi)];
            point4 = [r * Math.sin(theta) * Math.sin(phi + lat), r * Math.cos(phi + lat), r * Math.cos(theta) * Math.sin(phi + lat)];
            point5 = [r * Math.sin(theta + long) * Math.sin(phi + lat), r * Math.cos(phi + lat), r * Math.cos(theta + long) * Math.sin(phi + lat)];
            triangles.push([point2, point4, point3]);
            triangles.push([point3, point4, point5]);
            phi+=lat;
        }
        theta+=long;
    }
    for (current_triangle of triangles){
        addTriangle(
            current_triangle[0][0], current_triangle[0][1], current_triangle[0][2],
            current_triangle[1][0], current_triangle[1][1], current_triangle[1][2],
            current_triangle[2][0], current_triangle[2][1], current_triangle[2][2]
        );

    }
}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

