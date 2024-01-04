package com.kjh.filemanager.response

import java.util.Date

class FileListResponse(
    val fileInfo: List<Data>
) {
    class Data(val name: String, val size: String, val uploadDate: Date)
}