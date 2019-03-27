function Ball(x, y, vx, vy) {
   this.type = "ball";
   this.hash = hasnumber;
   hasnumber += 1;
   this.loc = new vector(x,y);
   this.v = new vector(vx,vy);
   this.a = new vector(0,0);
   this.r = 12;

   this.show = function(){
      ellipse(this.loc.x, this.loc.y, this.r*2);
   }

   this.update = function(){
      this.a.y = g;
      this.v.add(this.a);
      this.loc.add(this.v);
      for (let i = 0; i < elements.length; i++) {
         if(elements[i].hash != this.hash){
            if(elements[i].type == "line"){
               let pos = new vector(this.loc.x,this.loc.y);
               let newpos = new vector(this.loc.x,this.loc.y);
               let ptv = new vector(-this.v.x,-this.v.y);
               newpos.add(ptv);

               let x1 = newpos.x;
               let y1 = newpos.y;
               let x2 = pos.x;
               let y2 = pos.y;
               let x3 = elements[i].l1.x;
               let y3 = elements[i].l1.y;
               let x4 = elements[i].l2.x;
               let y4 = elements[i].l2.y;

               let pt1 = (x1*y2 - y1*x2)*(x3-x4);
               let pt2 = (x1-x2)*(x3*y4 - y3*x4);
               let pt3 = (x1-x2)*(y3-y4);
               let pt4 = (y1-y2)*(x3-x4);

               let px = (pt1-pt2)/(pt3-pt4);

               pt1 = (x1*y2 - y1*x2)*(y3-y4);
               pt2 = (y1-y2)*(x3*y4 - y3*x4);
               pt3 = (x1-x2)*(y3-y4);
               pt4 = (y1-y2)*(x3-x4);

               let py = (pt1-pt2)/(pt3-pt4);
               let xmx = max(x1,x2);
               let xmn = min(x1,x2);
               let ymx = max(y1,y2);
               let ymn = min(y1,y2);

               ellipse(px,py,10,10);
               ellipse(x1,y1,10,10);
               ellipse(x2,y2,10,10);

               if(xmn < px && px < xmx){
                  if(ymn < py && py < ymn){
                     console.log("Error");
                  }
               }

               let maxx = max(elements[i].l1.x,elements[i].l2.x) + this.r;
               let maxy = max(elements[i].l1.y,elements[i].l2.y) + this.r;
               let minx = min(elements[i].l1.x,elements[i].l2.x) - this.r;
               let miny = min(elements[i].l1.y,elements[i].l2.y) - this.r;
               if(this.loc.x < maxx && this.loc.x > minx && this.loc.y < maxy && this.loc.y > miny){
                  let dist = distance_point_line(this.loc.x,this.loc.y,elements[i].l1.x,elements[i].l1.y,elements[i].l2.x,elements[i].l2.y);
                  if (dist <= this.r) {
                     if (dist < this.r) {
                        let loc = new vector(this.loc.x,this.loc.y);
                        let d1 = distance_point_line(loc.x,loc.y,elements[i].l1.x,elements[i].l1.y,elements[i].l2.x,elements[i].l2.y);
                        let nv = new vector(elements[i].l2.y-elements[i].l1.y, elements[i].l1.x-elements[i].l2.x);
                        nv.inc(0.01);
                        loc.add(nv);
                        let d2 = distance_point_line(loc.x,loc.y,elements[i].l1.x,elements[i].l1.y,elements[i].l2.x,elements[i].l2.y);
                        if(d1 > d2) nv.inc(-1);
                        nv.inc(0.01);
                        while(dist < this.r){
                           this.loc.add(nv);
                           dist = distance_point_line(this.loc.x,this.loc.y,elements[i].l1.x,elements[i].l1.y,elements[i].l2.x,elements[i].l2.y);
                        }
                     }

                     let vzporedno = new vector (-elements[i].l1.x+elements[i].l2.x, -elements[i].l1.y+elements[i].l2.y);
                     let pravokotno = new vector (elements[i].l2.y-elements[i].l1.y, elements[i].l1.x-elements[i].l2.x);

                     let x1 = this.v.x;
                     let y1 = this.v.y;
                     let x2 = elements[i].l1.x-elements[i].l2.x;
                     let y2 = elements[i].l1.y-elements[i].l2.y;

                     let mag = sqrt(x1*x1+y1*y1);
                     let magV = mag;
                     let magL = sqrt(x2*x2+y2*y2);
                     let calc = x1 * x2 + y1 * y2;
                     let alfa = PI-acos((calc)/(magL*magV));
                     console.log(degrees(alfa));

                     let vzpMag = mag;
                     let praMag = mag;
                     vzpMag *= cos(alfa);
                     praMag *= sin(alfa);
                     round2(vzpMag,6);
                     round2(praMag,6);

                     vzporedno.setMag(vzpMag);
                     pravokotno.setMag(praMag);
                     vzporedno.inc(friction);
                     pravokotno.inc(bounce);

                     let loc = new vector(this.loc.x,this.loc.y);
                     let d1 = distance_point_line(loc.x,loc.y,elements[i].l1.x,elements[i].l1.y,elements[i].l2.x,elements[i].l2.y);
                     let nv = new vector(pravokotno.x+vzporedno.x,pravokotno.y+vzporedno.y);
                     nv.inc(0.01);
                     loc.add(nv);
                     let d2 = distance_point_line(loc.x,loc.y,elements[i].l1.x,elements[i].l1.y,elements[i].l2.x,elements[i].l2.y);
                     if(d1 > d2) pravokotno.inc(-1);
                     this.v.set(pravokotno.x+vzporedno.x,pravokotno.y+vzporedno.y);
                  }
               }
            }
         }
      }
      line(this.loc.x,this.loc.y,this.loc.x+this.v.x*15,this.loc.y+this.v.y*15);
   }
}
