Imports Microsoft.VisualBasic
Imports Mok.SqlParametros
Imports System.Data


Public Class ConexionDB

#Region "DECLARACION DE PROPIEDADES"
    Private _str_Conexion As String
    Public _strMessageError As String
#End Region

#Region "METODOS DE ACCESO A PROPIEDADES"
    Public Property str_Conexion() As String
        Get
            Return Me._str_Conexion
        End Get
        Set(ByVal value As String)
            Me._str_Conexion = value
        End Set
    End Property

    Public ReadOnly Property MensajeError() As String
        Get
            Return Me._strMessageError
        End Get
    End Property
#End Region

#Region "DECLARACIONES DE FUNCIONES PUBLICAS"
    Public Function GetDataSet(ByVal Sp As String, ByVal parametros As Mok.SqlParametros) As DataSet
        Dim cnn As Mok.SqlConexion = New Mok.SqlConexion(ConfigurationManager.ConnectionStrings.Item(Me._str_Conexion).ConnectionString)
        Try
            Me._strMessageError = ""
            cnn.Open()
            Return (cnn.GetDataSet(Sp, CommandType.StoredProcedure, parametros))
        Catch ex As Exception
            Me._strMessageError = ex.Message
            Return Nothing
        Finally
            cnn.Close()
            cnn.Dispose()
            cnn = Nothing
        End Try
    End Function

    Public Function GetDataTable(ByVal Sp As String) As DataTable
        Dim cnn As Mok.SqlConexion = New Mok.SqlConexion(ConfigurationManager.ConnectionStrings.Item(Me._str_Conexion).ConnectionString)
        Try
            Me._strMessageError = ""
            cnn.Open()
            Return cnn.GetDataTable(Sp, CommandType.StoredProcedure)
        Catch ex As Exception
            Me._strMessageError = ex.Message
            Return Nothing
        Finally
            cnn.Close()
            cnn.Dispose()
            cnn = Nothing
        End Try
    End Function

    Public Function GetDataTable(ByVal Sp As String, ByVal parametros As Mok.SqlParametros) As DataTable
        Dim cnn As Mok.SqlConexion = New Mok.SqlConexion(ConfigurationManager.ConnectionStrings.Item(Me._str_Conexion).ConnectionString)
        Try
            Me._strMessageError = ""
            cnn.Open()
            Return cnn.GetDataTable(Sp, CommandType.StoredProcedure, parametros)
        Catch ex As Exception
            Me._strMessageError = ex.Message
            Return Nothing

        Finally
            cnn.Close()
            cnn.Dispose()
            cnn = Nothing
        End Try
    End Function


    Public Function ExecuteScalar(ByVal Sp As String, ByVal parametros As Mok.SqlParametros) As String
        Dim cnn As Mok.SqlConexion = New Mok.SqlConexion(ConfigurationManager.ConnectionStrings.Item(Me._str_Conexion).ConnectionString)
        Try
            Me._strMessageError = ""
            cnn.Open()
            Return cnn.ExecuteScalar(Sp, CommandType.StoredProcedure, parametros)
        Catch ex As Exception
            Me._strMessageError = ex.Message
            Return Nothing
        Finally
            cnn.Close()
            cnn.Dispose()
            cnn = Nothing
        End Try
    End Function

    Public Function ExecuteNonQuery(ByVal Sp As String, ByVal parametros As Mok.SqlParametros) As Boolean
        Dim cnn As Mok.SqlConexion = New Mok.SqlConexion(ConfigurationManager.ConnectionStrings.Item(Me._str_Conexion).ConnectionString)
        Try
            Me._strMessageError = ""
            cnn.Open()
            cnn.ExecuteNonQuery(Sp, CommandType.StoredProcedure, parametros)
            Return True
        Catch ex As Exception
            Me._strMessageError = ex.Message
            Return False
        Finally
            cnn.Close()
            cnn.Dispose()
            cnn = Nothing
        End Try
    End Function

    Public Sub Dispose()
        Try
            GC.SuppressFinalize(Me)
        Catch ex As Exception
        End Try
    End Sub
#End Region
End Class

