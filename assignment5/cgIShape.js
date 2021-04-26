class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }
    
    makeCube (subdivisions)  {
		var triangles = [];
		var step = (1/subdivisions);
		var point1, point2, point3, point4, current_triangle;
		for(var i=0; i<subdivisions; i++){
			for(var j=0; j<subdivisions; j++){
				var point1 = [-0.5 + (i*step), -0.5 + (j*step), 0.5];
				var point2 = [-0.5 + ((i+1)*step), -0.5 + (j*step), 0.5];
				var point3 = [-0.5 + (i*step), -0.5 + ((j+1)*step), 0.5];
				var point4 = [-0.5 + ((i+1)*step), -0.5 + ((j+1)*step), 0.5];
				triangles.push([point1, point4, point3]);
				triangles.push([point1, point2, point4]);
			}
		}
		for(var i=0; i<subdivisions; i++){
			for(var j=0; j<subdivisions; j++){
				var point1 = [-0.5, -0.5 + (i*step), -0.5 + (j*step)];
				var point2 = [-0.5, -0.5 + ((i+1)*step), -0.5 + (j*step)];
				var point3 = [-0.5, -0.5 + (i*step), -0.5 + ((j+1)*step)];
				var point4 = [-0.5, -0.5 + ((i+1)*step), -0.5 + ((j+1)*step)];
				triangles.push([point1, point3, point4]);
				triangles.push([point1, point4, point2]);
			}
		}
		for(var i=0; i<subdivisions; i++){
			for(var j=0; j<subdivisions; j++){
				var point1 = [0.5, -0.5 + (i*step), -0.5 + (j*step)];
				var point2 = [0.5, -0.5 + ((i+1)*step), -0.5 + (j*step)];
				var point3 = [0.5, -0.5 + (i*step), -0.5 + ((j+1)*step)];
				var point4 = [0.5, -0.5 + ((i+1)*step), -0.5 + ((j+1)*step)];
				triangles.push([point1, point4, point3]);
				triangles.push([point1, point2, point4]);
			}
		}
		for(var i=0; i<subdivisions; i++){
			for(var j=0; j<subdivisions; j++){
				var point1 = [-0.5 + (i*step), 0.5, -0.5 + (j*step)];
				var point2 = [-0.5 + ((i+1)*step), 0.5, -0.5 + (j*step)];
				var point3 = [-0.5 + (i*step), 0.5, -0.5 + ((j+1)*step)];
				var point4 = [-0.5+ ((i+1)*step), 0.5, -0.5+ ((j+1)*step)];
				triangles.push([point1, point3, point4]);
				triangles.push([point1, point4, point2]);
			}
		}
		for(var i=0; i<subdivisions; i++){
			for(var j=0; j<subdivisions; j++){
				var point1 = [-0.5 + (i*step), -0.5 + (j*step), -0.5];
				var point2 = [-0.5 + ((i+1)*step), -0.5 + (j*step), -0.5];
				var point3 = [-0.5 + i*step, -0.5 + ((j+1)*step), -0.5];
				var point4 = [-0.5 + ((i+1)*step), -0.5 + ((j+1)*step), -0.5];
				triangles.push([point1, point3, point4]);
				triangles.push([point1, point4, point2]);
			}
		}
		for(var i=0; i<subdivisions; i++){
			for(var j=0; j<subdivisions; j++){
				var point1 = [-0.5+i*step, -0.5, -0.5+j*step];
				var point2 = [-0.5+(i+1)*step, -0.5, -0.5+j*step];
				var point3 = [-0.5+i*step, -0.5, -0.5+(j+1)*step];
				var point4 = [-0.5+(i+1)*step, -0.5, -0.5+(j+1)*step];
				triangles.push([point1, point4, point3]);
				triangles.push([point1, point2, point4]);
			}
		}
		for (current_triangle of triangles){
			this.addTriangle(
				current_triangle[0][0], current_triangle[0][1], current_triangle[0][2],
				current_triangle[1][0], current_triangle[1][1], current_triangle[1][2],
				current_triangle[2][0], current_triangle[2][1], current_triangle[2][2]
			);
		}
    }
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialdivision,heightdivision){
        var triangles = [];
		var circle_triangles = [];
		var side_triangles = [];
		var bottom = [0, -0.5, 0];
		var top = [0, 0.5, 0];
		var r = 0.5;
		var alpha = 0.0;
		var step = (360/radialdivision);
		var vertical_step = (1/heightdivision);
		var current_triangle;
		for(var i=0; i<radialdivision; i++){
			var b0 = [r * Math.cos(radians(alpha)), -0.5, r * Math.sin(radians(alpha))];
			var t0 = [r * Math.cos(radians(alpha)),  0.5, r * Math.sin(radians(alpha))];
			alpha += step;
			var b1 = [r * Math.cos(radians(alpha)), -0.5, r * Math.sin(radians(alpha))];
			var t1 = [r * Math.cos(radians(alpha)),  0.5, r * Math.sin(radians(alpha))];
			circle_triangles.push([bottom, b0, b1]);
			circle_triangles.push([top, t1, t0]);
			var height_mark = -0.5;
			for(var j=0; j<heightdivision; j++){
				var m0 = [b0[0], height_mark, b0[2]];
				var m1 = [b1[0], height_mark, b1[2]];
				height_mark += vertical_step;
				var m2 = [b0[0], height_mark, b0[2]];
				var m3 = [b1[0], height_mark, b1[2]];
				side_triangles.push([m3, m1, m0]);
				side_triangles.push([m2, m3, m0]);
			}
		}
		triangles = circle_triangles.concat(side_triangles);
		for (current_triangle of triangles){
			this.addTriangle(
				current_triangle[0][0], current_triangle[0][1], current_triangle[0][2],
				current_triangle[1][0], current_triangle[1][1], current_triangle[1][2],
				current_triangle[2][0], current_triangle[2][1], current_triangle[2][2]
			);
		}
    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialdivision, heightdivision) {
		var triangles = [];
		var side_triangles = [];
		var circle_triangles = [];
		var bottom = [0, -0.5, 0];
		var apex = [0, 0.5, 0];
		var r = 0.5;
		var alpha = 0.0;
		var step = 360 / radialdivision;
		for(var i=0; i<radialdivision; i++){
			var b0 = [r * Math.cos(radians(alpha)), -0.5, r * Math.sin(radians(alpha))];
			alpha += step;
			var b1 = [r * Math.cos(radians(alpha)), -0.5, r * Math.sin(radians(alpha))];
			circle_triangles.push([bottom, b0, b1]);
			var m0 = [b0[0], b0[1], b0[2]];
			var m1 = [b1[0], b1[1], b1[2]];
			var x0_step = (apex[0] - b0[0]) / heightdivision;
			var y0_step = (apex[1] - b0[1]) / heightdivision;
			var z0_step = (apex[2] - b0[2]) / heightdivision;
			var x1_step = (apex[0] - b1[0]) / heightdivision;
			var y1_step = (apex[1] - b1[1]) / heightdivision;
			var z1_step = (apex[2] - b1[2]) / heightdivision;
			for(var j=0; j<heightdivision; j++){
				if(j == heightdivision - 1){
					side_triangles.push([apex, m1, m0]);
				}
				else{
					var m2 = [m0[0] + x0_step, m0[1]+y0_step, m0[2]+z0_step];
					var m3 = [m1[0] + x1_step, m1[1]+y1_step, m1[2]+z1_step];
					side_triangles.push([m2, m1, m0]);
					side_triangles.push([m3, m1, m2]);
					m0 = m2;
					m1 = m3;
				}
			}
		}
		triangles = circle_triangles.concat(side_triangles);
		var current_triangle;
		for (current_triangle of triangles){
			this.addTriangle(
				current_triangle[0][0], current_triangle[0][1], current_triangle[0][2],
				current_triangle[1][0], current_triangle[1][1], current_triangle[1][2],
				current_triangle[2][0], current_triangle[2][1], current_triangle[2][2]
				);
		}
    }
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
		var current_triangle;
		var triangles = [];
		var r = 0.5;
		var long = radians(360/slices);
		var lat = radians(180/stacks);
		var point2, point3, point4;
		var theta = 0.0;
		for (var i=0; i<slices; i++){
			var phi = 0.0;
			for(var j=0; j<stacks; j++){
				var point2 = [r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi), r * Math.cos(theta) * Math.sin(phi)];
				var point3 = [r * Math.sin(theta + long) * Math.sin(phi), r * Math.cos(phi), r * Math.cos(theta + long) * Math.sin(phi)];
				var point4 = [r * Math.sin(theta) * Math.sin(phi + lat), r * Math.cos(phi + lat), r * Math.cos(theta) * Math.sin(phi + lat)];
				var point5 = [r * Math.sin(theta + long) * Math.sin(phi + lat), r * Math.cos(phi + lat), r * Math.cos(theta + long) * Math.sin(phi + lat)];
				triangles.push([point2, point4, point3]);
				triangles.push([point3, point4, point5]);
				phi+=lat;
			}
			theta+=long;
		}
		for (current_triangle of triangles){
			this.addTriangle(
				current_triangle[0][0], current_triangle[0][1], current_triangle[0][2],
				current_triangle[1][0], current_triangle[1][1], current_triangle[1][2],
				current_triangle[2][0], current_triangle[2][1], current_triangle[2][2]
			);

		}
	}
}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

