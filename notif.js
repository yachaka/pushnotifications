var gcm = require('node-gcm');

// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender('AAAAhbqLajU:APA91bGQOXrMzriNL9lcUQBAvuUVv6vsCg1-e6fhwOo-aALKQWfbdpKA381QbFxGSM4tMtjzkJHfp5vibJ_FS8-I0u8IcTNiccEOtjFH5U7PI-HP6zrlgkWKnPwEzH04936rHEK9-Hcy');

// Prepare a message to be sent
var message = new gcm.Message({
    priority: 'high',
    // contentAvailable: true,
    delayWhileIdle: false,
    timeToLive: 86400,
    // restrictedPackageName: "somePackageName",
    data: {
        key1: 'message1',
        key2: 'message2',
        title: "Hello, World",
        // icon: "ic_launcher",
        message: "This is a notification that will be displayed if your app is in the background.",
        actions: "['Accept','Reject']",
    },
    // notification: {
    //     sound: "default"
    // }
});

// Specify which registration IDs to deliver the message to
var regTokens = ['exOGf3enJpo:APA91bHq2ojIbuFi5ltU9cjlqAnenXxudnmWmGgPY1f2cTU3adg7CdKYzv3bzHeCMy_5fttyX6qRfhtXqUMHbcFSvdpJazo_qY470lkHqqp6LNBqY8htQBmVK4gStGzhOu9f4NXhUq76'];

// Actually send the message
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if (err) console.error(err);
    else console.log(response);
});
