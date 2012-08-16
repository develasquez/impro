Imports System.Web.Script.Services
Imports System.Data
Imports Mok.SqlConexion
Imports System.Globalization
Imports System.IO

Partial Class WebService_LiquidacionWS
    Inherits System.Web.UI.Page
    Const cteSitio As Integer = 123
    Public Property NroDeIntentos() As Integer
        Get
            Return Me.ViewState.Item("NroDeIntentos")
        End Get
        Set(ByVal value As Integer)
            Me.ViewState.Item("NroDeIntentos") = value
        End Set
    End Property


    Private ReadOnly Property Usuario() As Mok.Sesion.clsSesionUsuario
        Get
            Return Me.Session.Item("sesion")
        End Get
    End Property
    Private Sub PDF(ByVal ruta As String)

        Response.Clear()
        Response.Buffer = True
        Response.ContentType = "application/pdf"
        Dim myFileStream As New System.IO.FileStream(ruta, System.IO.FileMode.Open, FileAccess.Read)
        Dim FileSize As Long = myFileStream.Length
        Dim Buffer As Byte() = New Byte(CInt(FileSize) - 1) {}
        myFileStream.Read(Buffer, 0, CInt(FileSize))
        myFileStream.Close()
        Response.BinaryWrite(Buffer)
        Response.Flush()
        Response.End()

    End Sub
    <System.Web.Script.Services.ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
<System.Web.Services.WebMethod(True)> _
    Public Shared Function getMarcas() As String
        Try
            Dim Serializar As clsJsonSR.clsJsonSR = New clsJsonSR.clsJsonSR
            Dim conexion As New Mok.SqlConexion(ConfigurationManager.ConnectionStrings("cnnInsp").ConnectionString)
            Dim tablaMarcas As DataTable
            tablaMarcas = conexion.GetDataTable("paw_VEHObtieneMarcas")
            Return (Serializar.listaParaCombobox(True, tablaMarcas, Nothing))
        Catch ex As Exception
            Return ex.Message
        End Try

    End Function
    <System.Web.Script.Services.ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    <System.Web.Services.WebMethod(True)> _
    Public Shared Function getTipos() As String
        Try
            Dim Serializar As clsJsonSR.clsJsonSR = New clsJsonSR.clsJsonSR

            Dim conexion As New Mok.SqlConexion(ConfigurationManager.ConnectionStrings("cnnInsp").ConnectionString)
            Dim tablaTipos As DataTable
            tablaTipos = conexion.GetDataTable("paw_VEHObtieneTipos")
            Return (Serializar.listaParaCombobox(True, tablaTipos, Nothing))
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
    <System.Web.Script.Services.ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
    <System.Web.Services.WebMethod(True)> _
    Public Shared Function getCarrocerias() As String
        Try
            Dim Serializar As clsJsonSR.clsJsonSR = New clsJsonSR.clsJsonSR
            Dim conexion As New Mok.SqlConexion(ConfigurationManager.ConnectionStrings("cnnInsp").ConnectionString)
            Dim tablaCarrocerias As DataTable
            tablaCarrocerias = conexion.GetDataTable("paw_VEHObtieneCarrocerias")
            Return (Serializar.listaParaCombobox(True, tablaCarrocerias, Nothing))
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
    <System.Web.Script.Services.ScriptMethod(ResponseFormat:=ResponseFormat.Json)> _
        <System.Web.Services.WebMethod(True)> _
    Public Shared Function getCombustibles() As String
        Try
            Dim Serializar As clsJsonSR.clsJsonSR = New clsJsonSR.clsJsonSR
            Dim conexion As New Mok.SqlConexion(ConfigurationManager.ConnectionStrings("cnnInsp").ConnectionString)
            Dim tablaCombustibles As DataTable
            tablaCombustibles = conexion.GetDataTable("paw_VEHObtieneCombustibles")
            Return (Serializar.listaParaCombobox(True, tablaCombustibles, Nothing))
        Catch ex As Exception
            Return ex.Message
        End Try
    End Function
    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load

        Response.AppendHeader("Access-Control-Allow-Origin", "*")
        Dim metodo As String
        metodo = Request("metodo")
        Select Case metodo
            
        End Select


    End Sub


    Public Sub getUsuario()
        Dim Serializar As clsJsonSR.clsJsonSR = New clsJsonSR.clsJsonSR
        Try

            Dim usuario As New cls_Usuario
            usuario.id = Me.Usuario.Id
            usuario.nombre = Me.Usuario.Nombre
            usuario.cargo = Me.Usuario.Cargo
            usuario.codigoUsuario = Me.Usuario.CodigoUsuario
            usuario.email = Me.Usuario.EMail
            usuario.fono = Me.Usuario.Fono
            usuario.rut = Me.Usuario.PerRut
            usuario.tipoUsuario = Me.Usuario.TipoUsuario.Codigo
            usuario.fechaIngreso = Me.Usuario.FechaIngreso.ToString("d", DateTimeFormatInfo.InvariantInfo)


            'dado que el objeto princial de ususrio posee datos del conexiones a la basededatos 
            'se ha creado un nuevo objeto usuario para enviar como resultado solo los datos necesarios del cliente en formato JSON
            Response.Write(Serializar.listaParaCombobox(True, usuario, Nothing))



        Catch ex As Exception
            Dim _Error As New cls_Error
            _Error.msg = "La session ha Caducado"
            _Error.numero = "M101" 'La session ha Caducado
            Response.Write(Serializar.listaParaCombobox(True, _Error, Nothing))
            Response.End()

        Finally
            Serializar = Nothing
        End Try
    End Sub
    Public Sub iniciarSession(txtUsuario As String, txtPassword As String)

        Dim MokAdmSesion As New Mok.Sesion.ClsSesion(ConfigurationManager.ConnectionStrings.Item("MOKO").ConnectionString)
        Dim MokSesion As New Mok.Sesion.clsSesionUsuario
        Try
            If MokAdmSesion.UsuarioExiste(txtUsuario _
                                          , txtPassword _
                                          , Mok.Sesion.enuTipoSesion.ModeloPermisos _
                                          , Mok.Sesion.enuModoAutenticacion.UserId) = True Then

                MokSesion = MokAdmSesion.IniciarSesion(txtUsuario, txtPassword, Mok.Sesion.enuTipoSesion.ModeloPermisos, Mok.Sesion.enuModoAutenticacion.UserId)
                If IsNothing(MokSesion) = False Then
                    Me.Session.Add("sesion", MokSesion)
                    If MokSesion.Sitio.Codigo = 0 Then
                        If MokSesion.NroDeSitios > 0 Then
                            Dim tblPerfiles As New Mok.Sesion.clsSesionPerfilesUsuario
                            Me.Usuario.Sitio = MokAdmSesion.ObtenerSitio(cteSitio)
                            tblPerfiles = MokAdmSesion.ObtenerPerfilesUsuario(Me.Usuario.Id, Me.Usuario.Sitio.Codigo)
                            CType(Me.Session.Item("sesion"), Mok.Sesion.clsSesionUsuario).Perfil = tblPerfiles.Item(0)
                            If tblPerfiles.Count = 1 Then
                                Dim a As String = "{""success"": true, ""data"": [{""page"":""listaot.html""}],""errors"": null}"
                                Response.Write(a)

                            End If
                        End If
                    End If
                End If
            Else
                Dim a As String = "{""success"": true, ""data"": [{""error"":""noLogin""}],""errors"": null}"
                Response.Write(a)
                Me.NroDeIntentos += 1
                If Me.NroDeIntentos > 5 Then

                End If
            End If

        Catch ex As Exception

        End Try
    End Sub
    Public Sub finSession()
        Dim Serializar As clsJsonSR.clsJsonSR = New clsJsonSR.clsJsonSR
        Dim _Error As New cls_Error
        _Error.msg = "La session ha Caducado"
        _Error.numero = "M101" 'La session ha Caducado
        Response.Write(Serializar.listaParaCombobox(True, _Error, Nothing))
        Session.Abandon()
    End Sub


    Public Function DTaJason(ByVal dt As DataTable, Optional ByVal tipo As Integer = 2, Optional ByVal pagina As Integer = 0, Optional ByVal TotalPag As Integer = 1) As String
        Dim JsonString As New StringBuilder()
        If dt IsNot Nothing AndAlso dt.Rows.Count > 0 Then
            JsonString.Append("{")
            ' JsonString.Append("success: true")
            If tipo = 2 Then ' si es un listado para grilla
                JsonString.Append("""page"":""")
                JsonString.Append(pagina)
                JsonString.Append(""",""total"":")
                JsonString.Append(TotalPag)
                JsonString.Append(",""records"":""")
                JsonString.Append(dt.Rows.Count & """")
            End If
            JsonString.Append(",""rows"": [ ")
            For i As Integer = 0 To dt.Rows.Count - 1
                JsonString.Append("{""id"": """ & i + 1 & """")
                JsonString.Append(",""cell"": [ ")

                For j As Integer = 0 To dt.Columns.Count - 1
                    If j < dt.Columns.Count - 1 Then
                        JsonString.Append("""" & dt.Rows(i)(j).ToString().Trim().Replace(",", ".") & """,")
                    ElseIf j = dt.Columns.Count - 1 Then
                        JsonString.Append("""" & dt.Rows(i)(j).ToString().Trim().Replace(",", ".") & """")
                    End If
                    'If i = dt.Rows.Count - 1 Then
                    '    
                    'Else
                    '    JsonString.Append(", ")
                    'End If
                Next
                JsonString.Append("] ")
                If i = dt.Rows.Count - 1 Then
                    JsonString.Append("} ")
                Else
                    JsonString.Append("}, ")
                End If
            Next
            JsonString.Append("]")
            JsonString.Append("} ")
            Return JsonString.ToString()
        Else
            Return Nothing
        End If
    End Function
End Class

Public Class cls_Usuario
    Private _id As String = ""
    Public Property id() As String
        Get
            Return _id
        End Get
        Set(ByVal Value As String)
            _id = Value
        End Set
    End Property
    Private _nombre As String = ""
    Public Property nombre() As String
        Get
            Return _nombre
        End Get
        Set(ByVal Value As String)
            _nombre = Value
        End Set
    End Property
    Private _rut As Integer = 0
    Public Property rut() As Integer
        Get
            Return _rut
        End Get
        Set(ByVal Value As Integer)
            _rut = Value
        End Set
    End Property
    Private _codigoUsuario As Integer = 0
    Public Property codigoUsuario() As Integer
        Get
            Return _codigoUsuario
        End Get
        Set(ByVal Value As Integer)
            _codigoUsuario = Value
        End Set
    End Property
    Private _tipoUsuario As Integer = 0
    Public Property tipoUsuario() As Integer
        Get
            Return _tipoUsuario
        End Get
        Set(ByVal Value As Integer)
            _tipoUsuario = Value
        End Set
    End Property
    Private _cargo As String = ""
    Public Property cargo() As String
        Get
            Return _cargo
        End Get
        Set(ByVal Value As String)
            _cargo = Value
        End Set
    End Property
    Private _email As String = ""
    Public Property email() As String
        Get
            Return _email
        End Get
        Set(ByVal Value As String)
            _email = Value
        End Set
    End Property
    Private _fono As String = ""
    Public Property fono() As String
        Get
            Return _fono
        End Get
        Set(ByVal Value As String)
            _fono = Value
        End Set
    End Property
    Private _fechaIngreso As String
    Public Property fechaIngreso() As String
        Get
            Return _fechaIngreso
        End Get
        Set(ByVal Value As String)
            _fechaIngreso = Value
        End Set
    End Property




End Class
Public Class cls_Error
    Private _msg As String = ""
    Public Property msg() As String
        Get
            Return _msg
        End Get
        Set(ByVal Value As String)
            _msg = Value
        End Set
    End Property
    Private _numero As String = ""
    Public Property numero() As String
        Get
            Return _numero
        End Get
        Set(ByVal Value As String)
            _numero = Value
        End Set
    End Property
    Public ReadOnly Property isError() As String
        Get
            Return True
        End Get
    End Property



End Class
