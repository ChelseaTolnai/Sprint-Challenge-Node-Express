- [ ] Mention two parts of Express that you learned about this week.

Routing - The ability to select which handler functions to run based on the URL path.

Middleware - The ability to return or change a request or response using functions.

- [ ] Describe Middleware?

Middleware are functions that receive the request object and response object as arguments and perform a desired function task. That desired function task can be return ing the response object as is, calling the next middleware function, changing the request object, and/or changing the response object.  In express this can essentially create a desired stack of middleware which acts like an array of functions to be called at desired times.

- [ ] Describe a Resource?

A resource is a unique URL path given to represent all the interactions that can be performed on such path. One can then manage and create all endpoints and functions required for the base resource within one accessible file location. 

- [ ] What can the API return to help clients know if a request was successful?

For the client to  know if a request was successful, the API can return a response with a status code that reflects the successful operation. The successful http response status codes range in the 200’s. The API can return the status code along with sending the response data itself to make it clear to the client that the request was successful.

- [ ] How can we partition our application into sub-applications?

We can utilize express Routers to partition an application to make it easier to maintain resources and their respective functions and endpoints.