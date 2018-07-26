import { listen } from './app';
var port = process.env.PORT || 3000;

listen(port, function(){
    console.log('Server listening on port ' + port);
});