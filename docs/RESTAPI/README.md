## 1 - Giao thức giao tiếp

Giao thức giao tiếp giữa API và người dùng luôn sử dụng giao thức HTTPS.

## 2 - Tên miền

* <https://api.example.com>

OR

* <https://example.org/api/>

## 3 - Phiên bản

<https://api.example.com/v1/>

<https://api.example.com/v2/>

[https://docs.github.com/en/rest/overview/media-types#request-specific-version] (LINK)

## 4 - Điểm cuối (Endpoint)

* <https://api.example.com/v1/zoos>
  
* <https://api.example.com/v1/animal>

* <https://api.example.com/v1/employees>

## 5 - OPTIONS HTTP

* GET (SELECT): Lấy tài nguyên (một hoặc nhiều mục) từ máy chủ.
* CREATE (CREATE): Tạo một tài nguyên mới trên máy chủ.
* PUT (UPDATE): Cập nhật tài nguyên trên máy chủ (máy khách cung cấp tài nguyên đầy đủ sau khi thay đổi).
* PATCH (UPDATE): Cập nhật tài nguyên trên máy chủ (máy khách cung cấp các thuộc tính đã thay đổi).
* DELETE (DELETE): Xóa tài nguyên khỏi máy chủ.

AND

* HEAD: Lấy siêu dữ liệu của tài nguyên.

## 6 Filtering

* ?limit=10: Chỉ định số lượng bản ghi được trả về
* ?offset=10: Chỉ định vị trí bắt đầu của bản ghi được trả về.
* ?page=2&per_page=100: Chỉ định số trang và số lượng bản ghi trên mỗi trang.
* ?sortby=name&order=asc: Chỉ định thuộc tính nào để sắp xếp các kết quả trả về và thứ tự sắp xếp.

## 7 Return status

* 200: Máy chủ trả về thành công dữ liệu do người dùng yêu cầu.
* 201: CREATED- [POST / PUT / PATCH]: Người dùng đã tạo hoặc sửa đổi dữ liệu thành công.
* 202: Được chấp nhận. Cho biết một yêu cầu đã vào hàng đợi nền (tác vụ không đồng bộ)
* 204: KHÔNG CÓ NỘI DUNG- [XÓA]: Người dùng đã xóa thành công dữ liệu.
* 400: YÊU CẦU KHÔNG HỢP LỆ [POST / PUT / PATCH]: Có lỗi trong yêu cầu do người dùng gửi và máy chủ chưa thực hiện thao tác tạo hoặc sửa đổi dữ liệu. Thao tác này là vô ích.
* 401: Unauthorized [*]: cho biết rằng người dùng không có quyền (mã thông báo, tên người dùng và mật khẩu bị sai).
* 403: Forbidden [*] có nghĩa là người dùng được ủy quyền (trái ngược với lỗi 401), nhưng quyền truy cập bị cấm.
* 404: NOT FOUND [*]: Yêu cầu do người dùng gửi là một bản ghi không tồn tại và máy chủ chưa thực hiện một thao tác. Thao tác này là không quan trọng.
* 406: Không thể chấp nhận- [GET]: Không có định dạng do người dùng yêu cầu (ví dụ: người dùng yêu cầu định dạng JSON, nhưng chỉ có định dạng XML).
* 410: [GET]: Tài nguyên do người dùng yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn nữa.
* 422: Thực thể không thể xử lý- [POST / PUT / PATCH] Khi tạo một đối tượng, đã xảy ra lỗi xác thực.
* 500: LỖI MÁY CHỦ NỘI BỘ - [*]: Máy chủ bị lỗi và người dùng sẽ không thể xác định yêu cầu có thành công hay không.

## 8 - Xử lý Lỗi

```json
{
    error: "Invalid API key"
}
```

## 9 - Return

* GET / collection: trả về danh sách các đối tượng tài nguyên (mảng)
* GET / collection / resource: trả về một đối tượng tài nguyên duy nhất
* POST / collection: trả về đối tượng tài nguyên mới được tạo
* PUT / collection / resource: trả về đối tượng tài nguyên hoàn chỉnh
* PATCH / collection / resource: trả về đối tượng tài nguyên hoàn chỉnh
* DELETE / collection / resource: trả về một tài liệu trống

## 10 - HATEOAS [Hypermedia as the engine of application state]

* Ví dụ

```http
GET https://api.github.com
```

<https://www.youtube.com/watch?v=ngqwsfMMEEA>

<https://en.wikipedia.org/wiki/HATEOAS>

## DOCS

<https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm>

<https://en.wikipedia.org/wiki/Roy_Fielding>
