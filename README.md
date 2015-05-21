INTRODUCTION
======
see https://github.com/cloudwu/sproto

API
======
```
sp_obj = Sproto.CreateNew(buf): create a sproto decode/encode object from schema
pack_and_encoded_buf = sp_obj.pencode(type, obj): encode and pack a js obj of type
unpacked_and_decoded_obj = sp_obj.pdecode(type, buf): decode and unpack buf to a js obj of type
encoded_buf = sp_obj.encode(type, obj): encode a javascript obj of type
decoded_obj = sp_obj.decode(type, buf): decode buf to a javascript obj of type
packed_buf = sp_obj.pack(buf): pack buf
unpacked_buf = sp_obj.unpack(buf): unpack buf
```

LIMITATIONS
======
orderd map is not implemented

integer is limited to signed 32bit integer

