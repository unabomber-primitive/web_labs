package com.prokop.beans;

import lombok.*;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ManagedBean(name = "coordinates")
@SessionScoped
public class Coordinates implements Serializable {
    private double x;
    private double y;
    private double r;
    @ToString.Exclude
    private final double[] xValues = {-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5};

    public void setFirstXValue() {
        System.out.println("Set first x");
        this.x = xValues[0];
    }
    public void setSecondXValue() { this.x = xValues[1]; }
    public void setThirdXValue() { this.x = xValues[2]; }
    public void setFourthXValue() { this.x = xValues[3]; }
    public void setFifthXValue() { this.x = xValues[4]; }
    public void setSixthXValue() { this.x = xValues[5]; }
    public void setSeventhXValue() { this.x = xValues[6]; }
    public void setEighthXValue() { this.x = xValues[7]; }
}
