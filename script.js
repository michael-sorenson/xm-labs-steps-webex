var token = input['Bot Access Token'];

var createRoomRequest = http.request({
    'endpoint': 'WebEx',
    'headers': {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    'path': '/v1/rooms',
    'method': 'POST'
});
var createRoomResponse = createRoomRequest.write(input);
var roomId;
if (createRoomResponse.statusCode == 200) {
    var resp = JSON.parse(createRoomResponse.body);
    roomId = resp['id'];
    output['roomId'] = roomId;
}

var getRoomRequest = http.request({
    'endpoint': 'WebEx',
    'headers': {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    'path': '/v1/rooms/' + roomId + '/meetingInfo',
    'method': 'GET'
});
var getRoomResponse = getRoomRequest.write();
var meetingLink;
if (getRoomResponse.statusCode == 200) {
    var resp = JSON.parse(getRoomResponse.body);
    output['meetingLink'] = resp['meetingLink'];
    output['meetingNumber'] = resp['meetingNumber'];
    output['tollFreeNumber'] = resp['callInTollFreeNumber'];
    output['tollNumber'] = resp['callInTollNumber'];
}
