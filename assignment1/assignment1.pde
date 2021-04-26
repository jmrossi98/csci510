


void drawNameWithLines ()
{
  // insert your code here to draw the letters of your name 
  // using only lines()
  line (50, 100, 200, 100);
  line (150, 200, 150, 100);
  line (150, 200, 100, 250);
  line (250, 100, 350, 150);
  line (250, 100, 250, 250);
  line (250, 200, 350, 150);
  line (250, 200, 350, 250);
}

void drawNameWithTriangles ()
{
  // insert your code here to draw the letters of your name 
  // using only ltriangles()
  triangle (35, 35, 70, 35, 35, 70);
  triangle (35, 70, 70, 35, 70, 70);
  triangle (70, 35, 105, 35, 70, 70);
  triangle (70, 70, 105, 35, 105, 70);
  triangle (105, 35, 105, 70, 140, 35);
  triangle (105, 70, 140, 70, 140, 35);
  triangle (70, 70, 105, 70, 70, 105);
  triangle (105, 70, 105, 105, 70, 105);
  triangle (70, 105, 105, 105, 70, 140);
  triangle (105, 105, 105, 140, 70, 140);
  triangle (35, 105, 70, 105, 70, 140);
  triangle (175, 35, 175, 70, 210, 35);
  triangle (210, 35, 245, 35, 245, 70);
  triangle (175, 70, 175, 105, 210, 105);
  triangle (175, 140, 175, 105, 210, 105);
  triangle (175, 70, 210, 105, 245, 70);
  triangle (210, 105, 210, 140, 245, 140);
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

boolean doLine = false;
boolean doTri = false;
color backgroundColor = color (150, 150, 150);
color lineColor = color (0, 0, 0);
color fillColor = color (255, 0, 0);

void setup () 
{
  size (500, 500);
  background (backgroundColor);
}

void draw ()
{
  if (doLine) stroke(lineColor); else stroke (backgroundColor);
  drawNameWithLines();
  
  if (doTri) {
     fill(fillColor);
     stroke(fillColor);
  }
  else {
    fill(backgroundColor);
    stroke(backgroundColor);
  }
  drawNameWithTriangles();
}

void keyPressed()
{
  if (key == 'l') doLine = !doLine;
  if (key == 't') doTri = !doTri;
  if (key == 'q') exit();
}
