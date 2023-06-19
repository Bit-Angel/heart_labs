<?php
   if($_GET){
        if($_GET['general']){
            //Verificar para hacer el cambio de login
            $Tipo = $_GET['general'];
            if($Tipo == "getAllDoctor"){//'http://192.168.68.127/api.php?general=getAllDoctor
                $conn = conexion();
                // Configurar el modo de error para lanzar excepciones en caso de error
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // Consultar todos los datos de la tabla
                $query = "SELECT * FROM doctor"; // Reemplaza "nombre_tabla" con el nombre de la tabla que deseas consultar
                $stmt = $conn->query($query);
                // Obtener los datos de la consulta
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Convertir el resultado a formato JSON
                //$jsonResult = json_encode($result);
                // Imprimir el resultado en formato JSON
                echo json_encode(['intResponse' => 200, 'Doctors' => $result]);
                // Cerrar la conexión
                $conn = null;
            }else if($Tipo == "getAllUsers"){//'http://192.168.68.127/api.php?general=getAllUsers
                $conn = conexion();
                // Configurar el modo de error para lanzar excepciones en caso de error
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // Consultar todos los datos de la tabla
                $query = "SELECT * FROM usuario"; // Reemplaza "nombre_tabla" con el nombre de la tabla que deseas consultar
                $stmt = $conn->query($query);
                // Obtener los datos de la consulta
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Convertir el resultado a formato JSON
                //$jsonResult = json_encode($result);
                // Imprimir el resultado en formato JSON
                echo json_encode(['intResponse' => 200, 'Usuarios' => $result]);
                // Cerrar la conexión
                $conn = null;
            }else if($Tipo == "getUserByEmailAndPass"){ //'http://192.168.68.127/api.php?general=getUserByEmailAndPass&email='+email+'&pass='+password
                $email = $_GET['email'];
                $pass = $_GET['pass'];
                $conn = conexion();
                // Configurar el modo de error para lanzar excepciones en caso de error
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // Consultar todos los datos de la tabla
                $query = "SELECT * FROM usuario WHERE correo=:email AND contra=:pass";
                $stmt = $conn->prepare($query);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':pass', $pass);
                $stmt->execute();
                // Obtener los datos de la consulta
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Convertir el resultado a formato JSON
                //$jsonResult = json_encode($result);
                // Imprimir el resultado en formato JSON
                if (count($result) > 0) {
                    echo json_encode(['intResponse' => 200, 'strResponse' => $result]);
                } else {
                    echo json_encode(['intResponse' => 250, 'strResponse' => 'Login Incorrect']);
                }
                // Cerrar la conexión
                $conn = null;
            }else if($Tipo == "getDoctorByEmailAndPass"){ //'http://192.168.68.127/api.php?general=getDoctorByEmailAndPass&email='+email+'&pass='+password
                $email = $_GET['email'];
                $pass = $_GET['pass'];
                $conn = conexion();
                // Configurar el modo de error para lanzar excepciones en caso de error
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // Consultar todos los datos de la tabla
                $query = "SELECT * FROM doctor WHERE correo=:email AND contra=:pass"; // Reemplaza "nombre_tabla" con el nombre de la tabla que deseas consultar
                $stmt = $conn->prepare($query);
                // Asignar los valores a los parámetros de la consulta
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':pass', $pass);

                // Ejecutar la consulta
                $stmt->execute();
                // Obtener los datos de la consulta
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Convertir el resultado a formato JSON
                //$jsonResult = json_encode($result);
                // Imprimir el resultado en formato JSON
                if (count($result) > 0) {
                    echo json_encode(['intResponse' => 200, 'strResponse' => $result]);
                } else {
                    echo json_encode(['intResponse' => 250, 'strResponse' => 'Login Incorrect']);
                }
                // Cerrar la conexión
                $conn = null;
            }else if($Tipo == "getEst_Doc"){ //'http://192.168.68.127/api.php?general=getEst_Doc
                $conn = conexion();
                // Configurar el modo de error para lanzar excepciones en caso de error
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // Consultar todos los datos de la tabla
                $query = "SELECT e.id_estudio, e.nombre AS nombreEstudio, e.img, e.descripcion, e.precio, d.id_doc, CONCAT(d.nombre, ' ', d.primape, ' ', d.segape) AS nombreDoc, d.telefono, ed.id_est_doc, l.nombre as nombreLab, te.nombre as tipoEstudio
                FROM heart_labsDB.estudio e, heart_labsDB.doctor d, heart_labsDB.est_doc ed, heart_labsDB.laboratorio l, heart_labsDB.tipo_estudio te
                WHERE ed.id_estudio = e.id_estudio AND ed.id_doc = d.id_doc AND e.id_lab = l.id_lab AND e.id_tipo_est = te.id_tipo";
                $stmt = $conn->query($query);
                // Obtener los datos de la consulta
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Convertir el resultado a formato JSON
                //$jsonResult = json_encode($result);
                // Imprimir el resultado en formato JSON
                echo json_encode(['intResponse' => 200, 'strResponse' => $result]);
                // Cerrar la conexión
                $conn = null;
            }else if($Tipo == "getCitasUsuario"){ //'http://192.168.68.127/api.php?general=getCitasUsuario&id='+idUser
                $id = $_GET['id'];
                $conn = conexion();
                // Configurar el modo de error para lanzar excepciones en caso de error
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // Consultar todos los datos de la tabla
                $query = "SELECT e.id_estudio, e.nombre nombreEstudio,e.precio, CONCAT(d.nombre, ' ', d.primape, ' ', d.segape) AS nombreDoc, c.fecha, dir.direccion
                FROM heart_labsDB.estudio e, heart_labsDB.doctor d ,heart_labsDB.est_doc ed, heart_labsDB.cita c, heart_labsDB.usuario u,heart_labsDB.direccionesdoc dir
                WHERE ed.id_estudio = e.id_estudio and ed.id_doc = d.id_doc and u.id_usuario = :id and c.id_usuario = :id and c.id_est_doc = ed.id_est_doc and d.id_doc = dir.id_doc";

                // Preparar la sentencia
                $stmt = $conn->prepare($query);

                // Asignar el valor del parámetro
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);

                // Ejecutar la consulta
                $stmt->execute();

                // Obtener los datos de la consulta
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // Convertir el resultado a formato JSON
                //$jsonResult = json_encode($result);
                // Imprimir el resultado en formato JSON
                if (count($result) > 0) {
                    echo json_encode(['intResponse' => 200, 'strResponse' => $result]);
                } else {
                    echo json_encode(['intResponse' => 250, 'strResponse' => 'Login Incorrect']);
                }
                // Cerrar la conexión
                $conn = null;
            }else if($Tipo == "GetCitasDoctor"){ //'http://192.168.68.127/api.php?general=GetCitasDoctor&id='+idUser
                $id = $_GET['id'];
                $conn = conexion();
                // Configurar el modo de error para lanzar excepciones en caso de error
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // Consultar todos los datos de la tabla
                $query = "SELECT e.id_estudio, e.nombre nombreEstudio,e.precio, CONCAT(u.nombre, ' ', u.primape, ' ', u.segape) AS nombreUser, c.fecha, ed.id_est_doc, u.id_usuario, c.id_cita, c.resultado
                FROM heart_labsDB.estudio e, heart_labsDB.doctor d ,heart_labsDB.est_doc ed, heart_labsDB.cita c, heart_labsDB.usuario u
                WHERE ed.id_est_doc = c.id_est_doc and d.id_doc = :id and ed.id_doc = :id and c.id_usuario = u.id_usuario and ed.id_estudio = e.id_estudio";


                    $stmt = $conn->prepare($query);

                    // Asignar el valor del parámetro
                    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                    
                    // Ejecutar la consulta
                    $stmt->execute();
                    
                    // Obtener los datos de la consulta
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                // Convertir el resultado a formato JSON
                //$jsonResult = json_encode($result);
                // Imprimir el resultado en formato JSON
                echo json_encode(['intResponse' => 200, 'strResponse' => $result]);
                // Cerrar la conexión
                $conn = null;
            }







        }
    }else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Obtener el contenido del cuerpo de la solicitud
        $json = file_get_contents('php://input');
    
        // Verificar si se recibió un JSON válido
        if ($json !== false) {
            // Decodificar el JSON en un array asociativo
            $data = json_decode($json, true);
            // Verificar si se pudo decodificar el JSON correctamente
            if ($data !== null) {
                // Verificar si se recibieron los datos esperados en el JSON
                //set cita
                if (!isset($data['id'])&& isset($data['idUser']) && isset($data['id_est_doc']) && isset($data['fecha']) && isset($data['resultado'])) {
                    // Obtener los datos del JSON
                    $idUser = $data['idUser'];
                    $id_est_doc = $data['id_est_doc'];
                    $fecha = $data['fecha'];
                    $resultado = $data['resultado'];
    
                    // Establecer la conexión con la base de datos
                    $conn = conexion();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    try {
                        // Preparar la consulta para insertar los datos en la tabla correspondiente
                        $query = "INSERT INTO cita (id_usuario, id_est_doc, fecha, resultado) VALUES (:idUser, :id_est_doc, :fecha, :resultado)";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':idUser', $idUser);
                        $stmt->bindParam(':id_est_doc', $id_est_doc);
                        $stmt->bindParam(':fecha', $fecha);
                        $stmt->bindParam(':resultado', $resultado);
                        // Ejecutar la consulta para insertar los datos en la tabla
                        $stmt->execute();
                        // Cerrar la conexión
                        $conn = null;
                        // Enviar una respuesta exitosa
                        $response = ['intResponse' => 200, 'strResponse' => 'Add user OK'];
                        header('Content-Type: application/json');
                        echo json_encode($response);
                    } catch (PDOException $e) {
                        // Enviar una respuesta de error en caso de excepción
                        echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos en la base de datos']);
                    }
                }//set usuario
                else if (!isset($data['id'])&&isset($data['email']) && isset($data['password']) && isset($data['firstLastName']) && isset($data['secondLastName'])&& isset($data['name'])&& isset($data['phone'])&& isset($data['sex'])&& isset($data['birthday'])) {
                    // Obtener los datos del JSON
                    $email = $data['email'];
                    $password = $data['password'];
                    $firstLastName = $data['firstLastName'];
                    $secondLastName = $data['secondLastName'];
                    $name = $data['name'];
                    $phone = $data['phone'];
                    $sex = $data['sex'];
                    $birthday = $data['birthday'];
                    // Establecer la conexión con la base de datos
                    $conn = conexion();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    try {
                        // Preparar la consulta para insertar los datos en la tabla correspondiente
                        $query = "INSERT INTO usuario (nombre, primape, segape, correo, contra, sexo, fecha_nac) VALUES (:name, :firstLastName, :secondLastName, :email, :password, :sex, :birthday)";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':name', $name);
                        $stmt->bindParam(':firstLastName', $firstLastName);
                        $stmt->bindParam(':secondLastName', $secondLastName);
                        $stmt->bindParam(':email', $email);
                        $stmt->bindParam(':password', $password);
                        $stmt->bindParam(':sex', $sex);
                        $stmt->bindParam(':birthday', $birthday);
                        // Ejecutar la consulta para insertar los datos en la tabla
                        $stmt->execute();
                        // Cerrar la conexión
                        $conn = null;
                        // Enviar una respuesta exitosa
                        $response = ['intResponse' => 200, 'strResponse' => 'Add user OK'];
                        header('Content-Type: application/json');
                        echo json_encode($response);
                    } catch (PDOException $e) {
                        // Enviar una respuesta de error en caso de excepción
                        echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos en la base de datos']);
                    }
                }//set doctor
                else if (!isset($data['id'])&&isset($data['email']) && isset($data['password']) && isset($data['firstLastName']) && isset($data['secondLastName'])&& isset($data['name'])&& isset($data['phone'])&& isset($data['cedule'])) {
                    // Obtener los datos del JSON
                    $email = $data['email'];
                    $password = $data['password'];
                    $firstLastName = $data['firstLastName'];
                    $secondLastName = $data['secondLastName'];
                    $name = $data['name'];
                    $phone = $data['phone'];
                    $cedule = $data['cedule'];
                    // Establecer la conexión con la base de datos
                    $conn = conexion();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    try {
                        // Preparar la consulta para insertar los datos en la tabla correspondiente
                        $query = "INSERT INTO doctor (nombre, primape, segape, correo, contra, telefono, cedula) VALUES (:name, :firstLastName, :secondLastName, :email, :password, :phone, :cedule)";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':name', $name);
                        $stmt->bindParam(':firstLastName', $firstLastName);
                        $stmt->bindParam(':secondLastName', $secondLastName);
                        $stmt->bindParam(':email', $email);
                        $stmt->bindParam(':password', $password);
                        $stmt->bindParam(':phone', $phone);
                        $stmt->bindParam(':cedule', $cedule);
                        // Ejecutar la consulta para insertar los datos en la tabla
                        $stmt->execute();
                        // Cerrar la conexión
                        $conn = null;
                        // Enviar una respuesta exitosa
                        $response = ['intResponse' => 200, 'strResponse' => 'Add user OK'];
                        header('Content-Type: application/json');
                        echo json_encode($response);
                    } catch (PDOException $e) {
                        // Enviar una respuesta de error en caso de excepción
                        echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos en la base de datos']);
                    }
                }//set est_doc
                else if (!isset($data['id'])&&isset($data['id_doc']) && isset($data['id_estudio'])) {
                    // Obtener los datos del JSON
                    $id_doc = $data['id_doc'];
                    $id_estudio = $data['id_estudio'];
                    
                    // Establecer la conexión con la base de datos
                    $conn = conexion();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    try {
                        // Preparar la consulta para insertar los datos en la tabla correspondiente
                        $query = "INSERT INTO est_doc (id_doc, id_estudio) VALUES (:id_doc, :id_estudio)";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':id_doc', $id_doc);
                        $stmt->bindParam(':id_estudio', $id_estudio);
                        // Ejecutar la consulta para insertar los datos en la tabla
                        $stmt->execute();
                        // Cerrar la conexión
                        $conn = null;
                        // Enviar una respuesta exitosa
                        $response = ['intResponse' => 200, 'strResponse' => 'Add est_doc OK'];
                        header('Content-Type: application/json');
                        echo json_encode($response);
                    } catch (PDOException $e) {
                        // Enviar una respuesta de error en caso de excepción
                        echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos en la base de datos']);
                    }
                }//Borrar un usuario
                else if (isset($data['id'])&&!isset($data['email'])&&!isset($data['resultado'])) {
                    // Obtener los datos del JSON
                    $id = $data['id'];
                    
                    // Establecer la conexión con la base de datos
                    $conn = conexion();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    try {
                        // Preparar la consulta para insertar los datos en la tabla correspondiente
                        $query = "DELETE FROM usuario WHERE id_usuario = :id";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':id', $id);
                        // Ejecutar la consulta para insertar los datos en la tabla
                        $stmt->execute();
                        // Cerrar la conexión
                        $conn = null;
                        // Enviar una respuesta exitosa
                        $response = ['intResponse' => 200, 'strResponse' => 'Add user OK'];
                        header('Content-Type: application/json');
                        echo json_encode($response);
                    } catch (PDOException $e) {
                        // Enviar una respuesta de error en caso de excepción
                        echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos en la base de datos']);
                    }
                }//update user
                else if (isset($data['id'])&&isset($data['email']) && isset($data['primape']) && isset($data['segape'])&& isset($data['name'])&& isset($data['phone'])&& isset($data['sex'])&& isset($data['birthday'])) {
                    // Obtener los datos del JSON
                    $id = $data['id'];
                    $email = $data['email'];
                    $primape = $data['primape'];
                    $segape = $data['segape'];
                    $name = $data['name'];
                    $phone = $data['phone'];
                    $sex = $data['sex'];
                    $birthday = $data['birthday'];
                    // Establecer la conexión con la base de datos
                    $conn = conexion();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    try {
                        // Preparar la consulta para insertar los datos en la tabla correspondiente
                        $query = "UPDATE usuario SET nombre=:name, primape=:primape, segape=:segape, correo=:email, sexo=:sex, fecha_nac=:birthday WHERE id_usuario = :id";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':id', $id);
                        $stmt->bindParam(':name', $name);
                        $stmt->bindParam(':primape', $primape);
                        $stmt->bindParam(':segape', $segape);
                        $stmt->bindParam(':email', $email);
                        $stmt->bindParam(':sex', $sex);
                        $stmt->bindParam(':birthday', $birthday);
                        // Ejecutar la consulta para insertar los datos en la tabla
                        $stmt->execute();
                        // Cerrar la conexión
                        $conn = null;
                        // Enviar una respuesta exitosa
                        $response = ['intResponse' => 200, 'strResponse' => 'Add user OK'];
                        header('Content-Type: application/json');
                        echo json_encode($response);
                    } catch (PDOException $e) {
                        // Enviar una respuesta de error en caso de excepción
                        echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos en la base de datos']);
                    }
                }//update doctores
                else if (isset($data['id'])&&isset($data['email']) && isset($data['primape']) && isset($data['segape'])&& isset($data['name'])&& isset($data['phone'])&& isset($data['cedule'])) {
                    // Obtener los datos del JSON
                    $id = $data['id'];
                    $email = $data['email'];
                    $primape = $data['primape'];
                    $segape = $data['segape'];
                    $name = $data['name'];
                    $phone = $data['phone'];
                    $cedule = $data['cedule'];
                    // Establecer la conexión con la base de datos
                    $conn = conexion();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    try {
                        // Preparar la consulta para insertar los datos en la tabla correspondiente
                        $query = "UPDATE doctor SET nombre=:name, primape=:primape, segape=:segape, correo=:email, telefono=:phone, cedula=:cedule WHERE id_doc = :id";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':id', $id);
                        $stmt->bindParam(':name', $name);
                        $stmt->bindParam(':primape', $primape);
                        $stmt->bindParam(':segape', $segape);
                        $stmt->bindParam(':email', $email);
                        $stmt->bindParam(':phone', $phone);
                        $stmt->bindParam(':cedule', $cedule);
                        // Ejecutar la consulta para insertar los datos en la tabla
                        $stmt->execute();
                        // Cerrar la conexión
                        $conn = null;
                        // Enviar una respuesta exitosa
                        $response = ['intResponse' => 200, 'strResponse' => 'Add user OK'];
                        header('Content-Type: application/json');
                        echo json_encode($response);
                    } catch (PDOException $e) {
                        // Enviar una respuesta de error en caso de excepción
                        echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos en la base de datos']);
                    }
                }//update Resultado de cita
                else if (isset($data['id'])&&isset($data['resultado'])) {
                    // Obtener los datos del JSON
                    $id = $data['id'];
                    $resultado = $data['resultado'];
                    
                    // Establecer la conexión con la base de datos
                    $conn = conexion();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    try {
                        // Preparar la consulta para insertar los datos en la tabla correspondiente
                        $query = "UPDATE cita SET resultado=:resultado WHERE id_cita = :id";
                        $stmt = $conn->prepare($query);
                        $stmt->bindParam(':id', $id);
                        $stmt->bindParam(':resultado', $resultado);
                        // Ejecutar la consulta para insertar los datos en la tabla
                        $stmt->execute();
                        // Cerrar la conexión
                        $conn = null;
                        // Enviar una respuesta exitosa
                        $response = ['intResponse' => 200, 'strResponse' => 'Add user OK'];
                        header('Content-Type: application/json');
                        echo json_encode($response);
                    } catch (PDOException $e) {
                        // Enviar una respuesta de error en caso de excepción
                        echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos en la base de datos']);
                    }
                }//si no es ninguno de los anteriores
                else {
                    // Enviar una respuesta de error si no se recibieron los datos esperados en el JSON
                    echo json_encode(['status' => 'error', 'message' => 'Datos faltantes en el JSON']);
                }
            } else {
                // Enviar una respuesta de error si el JSON no pudo ser decodificado correctamente
                echo json_encode(['status' => 'error', 'message' => 'Error al decodificar el JSON']);
            }
        } else {
            // Enviar una respuesta de error si no se pudo obtener el JSON del cuerpo de la solicitud
            echo json_encode(['status' => 'error', 'message' => 'Error al obtener el JSON de la solicitud']);
        }
    } else {
        // Enviar una respuesta de error si la solicitud no es de tipo POST
        echo json_encode(['status' => 'error', 'message' => 'Método de solicitud no válido']);
    }
    
function conexion(){
    $host = "192.168.211.107";
    $port = 3306;
    $user = "arturo";
    $password = "Estaesla1";
    $database = "heart_labsDB";
    try {
        // Establecer la conexión con la base de datos
        $dsn = "mysql:host=$host;port=$port;dbname=$database";
        $conn = new PDO($dsn, $user, $password);
        return $conn;
    } catch (PDOException $e) {
        echo "Error en la conexión: " . $e->getMessage();
    }
}
?>
