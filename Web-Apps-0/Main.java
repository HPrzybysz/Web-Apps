import java.util.Random;
import java.util.*;

public class Main {
    public static void main(String[] args ){
        int n = 10;
        float numbers[] = new float[n];
        Random random = new Random();

        for(int i=0 ; i<n; i++){
            numbers[i] = random.nextFloat(-10,100);
        }

        for(float value: numbers){
            System.out.print(value + " ");
        }

        int x = numbers.length;
        for(int j=0; j<x; j++){
            for(int k=0; k<x-j-1; k++){
                if(numbers[k]>numbers[k+1]){
                    float temp = numbers[k];
                    numbers[k] = numbers[k+1];
                    numbers[k+1] = temp;
                }
            }
        }

        System.out.println("\nSorted array: ");
        for(float value: numbers){
            System.out.print(value + " ");
        }
    }
}