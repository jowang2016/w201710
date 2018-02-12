package main
import "fmt"
func main(){
	var c1,c2,c3 chan int
	var i1,i2 int
	select{
		case i1= <-c1:
			fmt.Println("receive ", i1, " from c1\n")
		case c2 <- i2:
			fmt.Println("sent ",i2," to c2\n")
		case i3, ok := (<-c3):
			if ok {
				fmt.Println("receive ", i3, " from c3\n")
			} else {
				fmt.Println("c3 is closed\n")
			}
		default:
			fmt.Println("no communication\n")
	}
}